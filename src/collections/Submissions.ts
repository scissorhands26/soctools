// collections/Submissions.ts
import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  access: {
    read: ({ req: { user } }) => !!user, // Logged in users can read their own submissions. Could refine this further.
    create: ({ req: { user } }) => !!user,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'quiz',
      type: 'relationship',
      relationTo: 'quizzes',
      required: true,
    },
    {
      name: 'submissionDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'score',
      type: 'number',
    },
    {
      name: 'attemptNumber',
      type: 'number',
      defaultValue: 1,
    },
  ],
  timestamps: true,
}
