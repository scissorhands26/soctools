// collections/Progress.ts
import type { CollectionConfig } from 'payload'

export const Progress: CollectionConfig = {
  slug: 'progress',
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
    },
    {
      name: 'isCompleted',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'completionDate',
      type: 'date',
    },
    {
      name: 'timeSpent',
      type: 'number', // track time in seconds or minutes
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
