import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Form } from './forms.model';
import { Answer } from './answers.model';
import { Question } from '../questions/questions.model';
import { Templates } from '../templates/templates.model';
import { QuestionType } from '../types/enum';
import { SubmitFormDto } from './dto/submit-form.dto';

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
    const questions = await this.validateQuestion(dto);
    for (const answer of dto.answers) {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question) {
        throw new NotFoundException(
          `Question with ID ${answer.questionId} not found`,
        );
      }

      if (!this.validateAnswer(answer.value, question.dataValues.type)) {
        throw new NotFoundException(
          `Invalid answer value for question ID ${answer.questionId} (expected ${question.type}, got ${answer.value})`,
        );
      }
    }

    const form = await this.formRepository.create({
      templateId: dto.templateId,
      userId: dto.userId,
    });

    const answers = dto.answers.map((answer) => ({
      formId: form.id,
      questionId: answer.questionId,
      value: answer.value,
    }));

    await this.answerRepository.bulkCreate(answers, {
      returning: true,
    });

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
        return typeof value === 'boolean';
      default:
        return false;
    }
  }

  private async validateQuestion(dto: SubmitFormDto) {
    const requiredQuestionIds = (
      await this.questionRepository.findAll({
        where: {
          templateId: dto.templateId,
          isRequired: true,
        },
        attributes: ['id'],
      })
    ).map((q) => q.id);

    const answeredQuestionIds = dto.answers.map((a) => a.questionId);

    const allRequiredAnswered = requiredQuestionIds.every((id) =>
      answeredQuestionIds.includes(id),
    );

    if (!allRequiredAnswered) {
      throw new NotFoundException(
        'There are no answers to the required questions.',
      );
    }

    const questions = await this.questionRepository.findAll({
      where: {
        id: answeredQuestionIds,
        templateId: dto.templateId,
      },
    });

    if (questions.length !== answeredQuestionIds.length) {
      throw new NotFoundException(
        'Some answered questions do not belong to the selected template',
      );
    }
    return questions;
  }
}
