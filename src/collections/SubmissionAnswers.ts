// collections/SubmissionAnswers.ts
import type { CollectionConfig } from 'payload'

export const SubmissionAnswers: CollectionConfig = {
  slug: 'submission_answers',
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => false, // Typically created along with submissions or via hooks
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'submission',
      type: 'relationship',
      relationTo: 'submissions',
      required: true,
    },
    {
      name: 'question',
      type: 'relationship',
      relationTo: 'questions',
      required: true,
    },
    {
      name: 'answer',
      type: 'relationship',
      relationTo: 'answers',
    },
    {
      name: 'userAnswerText',
      type: 'richText',
    },
  ],
  timestamps: true,
}
