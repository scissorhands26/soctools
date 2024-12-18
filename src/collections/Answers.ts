// collections/Answers.ts
import type { CollectionConfig } from 'payload'

export const Answers: CollectionConfig = {
  slug: 'answers',
  access: {
    read: () => true,
    create: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
    update: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
    delete: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
  },
  fields: [
    {
      name: 'question',
      type: 'relationship',
      relationTo: 'questions',
      required: true,
    },
    {
      name: 'answerText',
      type: 'richText',
      required: true,
    },
    {
      name: 'isCorrect',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  timestamps: true,
}
