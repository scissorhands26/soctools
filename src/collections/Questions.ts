// collections/Questions.ts
import type { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  access: {
    read: () => true,
    create: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
    update: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
    delete: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
  },
  fields: [
    {
      name: 'quiz',
      type: 'relationship',
      relationTo: 'quizzes',
      required: true,
    },
    {
      name: 'questionText',
      type: 'richText',
      required: true,
    },
    {
      name: 'questionType',
      type: 'select',
      options: [
        { label: 'Multiple Choice', value: 'multiple_choice' },
        { label: 'True/False', value: 'true_false' },
        { label: 'Fill in the Blank', value: 'fill_in_blank' },
        { label: 'Short Answer', value: 'short_answer' },
        { label: 'Code Challenge', value: 'code_challenge' },
      ],
      defaultValue: 'multiple_choice',
    },
  ],
  timestamps: true,
}
