import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { QuestionI, QuestionType, TagI } from "src/types/type";

export const useTemplateForm = (createTemplates: Function, navigate: Function) => {
  const [questions, setQuestions] = useState<QuestionI[]>([]);
  const [tags, setTags] = useState<TagI[]>([]);
  const [tagInput, setTagInput] = useState("");

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(255),
    description: Yup.string().required('Description is required'),
    topic: Yup.string().max(50).required('Topic is required'),
    isPublic: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      topic: '',
      isPublic: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createTemplates({
          ...values,
          questions,
          tags: tags.map(tag => tag.name),
        });
        navigate("/");
      } catch (error) {
        console.error("Error creating template:", error);
      }
    },
  });

  // Question actions
  const addQuestion = () => {
    const newQuestion: QuestionI = {
      id: Date.now().toString(),
      question: "",
      type: QuestionType.TEXT,
      isRequired: false,
      options: [],
      order: questions.length,
      showInTable: false,
      description: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof QuestionI, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  // Option actions
  const addOption = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, options: [...q.options, ""] } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const deleteOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions.splice(optionIndex, 1);
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  // Tag actions
  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.some(tag => tag.name === tagInput.trim())) {
      setTags([...tags, { name: tagInput.trim() }]);
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete: TagI) => {
    setTags(tags.filter(tag => tag.name !== tagToDelete.name));
  };

  // Validation
  const validateQuestions = () => {
    return questions.every(q =>
      q.question.trim() !== "" &&
      (q.type !== QuestionType.SELECT && q.type !== QuestionType.CHECKBOX ||
        q.options.every(opt => opt.trim() !== ""))
    );
  };

  return {
    formik,
    questions,
    tags,
    tagInput,
    setTagInput,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addOption,
    updateOption,
    deleteOption,
    handleTagAdd,
    handleTagDelete,
    validateQuestions,
  };
};