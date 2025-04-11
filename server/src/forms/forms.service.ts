import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Form } from './forms.model';
import { Answer } from './answers.model';
import { Question } from '../questions/questions.model';
import { Templates } from '../templates/templates.model';
import { QuestionType } from '../types/enum';

interface SubmitFormDto {
  templateId: number;
  userId: number;
  answers: {
    questionId: number;
    value: string;
  }[];
}

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form) private formRepository: typeof Form,
    @InjectModel(Answer) private answerRepository: typeof Answer,
    @InjectModel(Question) private questionRepository: typeof Question,
    @InjectModel(Templates) private templateRepository: typeof Templates,
  ) {}

  async submitForm(dto: SubmitFormDto) {
    const template = await this.templateRepository.findByPk(dto.templateId);
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    // Получаем все вопросы, чтобы проверить типы
    const questionIds = dto.answers.map((a) => a.questionId);
    const questions = await this.questionRepository.findAll({
      where: { id: questionIds },
    });

    // Проверка валидности каждого ответа
    for (const answer of dto.answers) {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question) {
        throw new NotFoundException(
          `Question with ID ${answer.questionId} not found`,
        );
      }

      if (!this.validateAnswer(answer.value, question.dataValues.type)) {
        console.log(answer);
        console.log(question);
        throw new NotFoundException(
          `Invalid answer value for question ID ${answer.questionId} (expected ${question.type}, got ${answer.value})`,
        );
      }
    }

    // Создаем запись о заполнении формы
    const form = await this.formRepository.create({
      templateId: dto.templateId,
      userId: dto.userId,
    });

    // Сохраняем ответы
    const answers = dto.answers.map((answer) => ({
      formResponseId: form.id,
      questionId: answer.questionId,
      value: answer.value,
    }));

    await this.answerRepository.bulkCreate(answers, { returning: true });

    return await this.getFormResponse(form.id);
  }

  async getFormResponse(id: number) {
    const form = await this.formRepository.findByPk(id, {
      include: [
        {
          model: Answer,
          include: [Question],
        },
        Templates,
      ],
    });
    if (!form) {
      throw new NotFoundException('Form response not found');
    }

    return form;
  }

  async getUserResponses(userId: number) {
    return this.formRepository.findAll({
      where: { userId },
      include: [
        {
          model: Answer,
          include: [Question],
        },
        Templates,
      ],
      order: [['submittedAt', 'DESC']],
    });
  }

  async getTemplateResponses(templateId: number) {
    return this.formRepository.findAll({
      where: { templateId },
      include: [
        {
          model: Answer,
          include: [Question],
        },
        Templates,
      ],
      order: [['submittedAt', 'DESC']],
    });
  }

  private validateAnswer(value: string, type: QuestionType) {
    console.log(type);
    console.log(value);
    switch (type) {
      case QuestionType.TEXT:
      case QuestionType.TEXTAREA:
        return typeof value === 'string';
      case QuestionType.NUMBER:
        return !isNaN(Number(value));
      case QuestionType.CHECKBOX:
        return typeof value === "boolean";
      default:
        return false;
    }
  }
}
