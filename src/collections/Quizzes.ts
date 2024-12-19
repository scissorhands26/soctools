// collections/Quizzes.ts
import type { CollectionConfig } from 'payload'

export const Quizzes: CollectionConfig = {
  slug: 'quizzes',
  access: {
    read: () => true,
    create: ({ req: { user } }) =>
      Boolean(user?.role && ['admin', 'instructor'].includes(user.role)),
    update: ({ req: { user } }) =>
      Boolean(user?.role && ['admin', 'instructor'].includes(user.role)),
    delete: ({ req: { user } }) =>
      Boolean(user?.role && ['admin', 'instructor'].includes(user.role)),
  },
  fields: [
    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules',
      required: true,
    },
    {
      name: 'quizTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'quizDescription',
      type: 'richText',
    },
  ],
  timestamps: true,
}
