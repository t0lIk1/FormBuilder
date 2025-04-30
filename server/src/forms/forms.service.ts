import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Form } from './forms.model';
import { Answer } from './answers.model';
import { Question } from '../questions/questions.model';
import { Template } from '../templates/templates.model';
import { QuestionType } from '../types/enum';
import { SubmitFormDto } from './dto/submit-form.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form) private formRepository: typeof Form,
    @InjectModel(Answer) private answerRepository: typeof Answer,
    @InjectModel(Question) private questionRepository: typeof Question,
    @InjectModel(Template) private templateRepository: typeof Template,
  ) {}

  async submitForm(dto: SubmitFormDto, templateId: number) {
    const template = await this.templateRepository.findByPk(templateId);
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    const questions = await this.validateQuestion(dto, templateId);
    for (const answer of dto.answers) {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question) {
        throw new NotFoundException(
          `Question with ID ${answer.questionId} not found`,
        );
      }

      if (!this.validateAnswer(answer.value, question.dataValues.type)) {
        throw new NotFoundException(
          `Invalid answer value for question ID ${answer.questionId} (expected ${question.dataValues.type}, got ${answer.value})`,
        );
      }
    }

    const form = await this.formRepository.create({
      templateId,
      userId: dto.userId,
    });

    const answers = dto.answers.map((answer) => ({
      formId: form.id,
      questionId: answer.questionId,
      value: answer.value,
    }));

    await this.answerRepository.bulkCreate(answers as any);

    return await this.getFormResponse(form.id);
  }

  async getFormResponse(id: number) {
    const form = await this.formRepository.findByPk(id, {
      include: [
        {
          model: Answer,
          include: [Question],
        },
        Template,
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
        Template,
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
        Template,
      ],
      order: [['submittedAt', 'DESC']],
    });
  }

  private validateAnswer(value: string | string[], type: QuestionType) {
    switch (type) {
      case QuestionType.TEXT:
      case QuestionType.TEXTAREA:
        return typeof value === 'string';
      case QuestionType.NUMBER:
        return !isNaN(Number(value));
      case QuestionType.CHECKBOX:
        return Array.isArray(value);
      case QuestionType.SELECT:
        return value.length === 1;
      default:
        return false;
    }
  }

  private async validateQuestion(dto: SubmitFormDto, templateId: number) {
    const requiredQuestionIds = (
      await this.questionRepository.findAll({
        where: {
          templateId,
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
        templateId,
      },
    });

    if (questions.length !== answeredQuestionIds.length) {
      throw new NotFoundException(
        'Some answered questions do not belong to the selected template',
      );
    }
    return questions;
  }

  async updateFormResponse(id: number, dto: SubmitFormDto, userId: number) {
    const form = await this.formRepository.findByPk(id);
    if (!form) {
      throw new NotFoundException('Form not found');
    }

    if (form.userId !== userId) {
      throw new NotFoundException('You are not authorized to update this form');
    }

    const questions = await this.validateQuestion(dto, form.templateId);
    for (const answer of dto.answers) {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question) {
        throw new NotFoundException(
          `Question with ID ${answer.questionId} not found`,
        );
      }
      console.log(question);
      if (!this.validateAnswer(answer.value, question.type)) {
        throw new NotFoundException(
          `Invalid answer value for question ID ${answer.questionId} (expected ${question.type}, got ${answer.value})`,
        );
      }
    }

    await this.answerRepository.destroy({
      where: { formId: id },
    });

    const answers = dto.answers.map((answer) => ({
      formId: id,
      questionId: answer.questionId,
      value: answer.value,
    }));

    await this.answerRepository.bulkCreate(answers as any);

    return await this.getFormResponse(id);
  }
}
