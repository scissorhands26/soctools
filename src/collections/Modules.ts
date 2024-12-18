// collections/Modules.ts
import type { CollectionConfig } from 'payload'

export const Modules: CollectionConfig = {
  slug: 'modules',
  access: {
    read: () => true,
    create: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
    update: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
    delete: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
  },
  admin: {
    useAsTitle: 'moduleTitle',
  },
  fields: [
    {
      name: 'moduleTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'moduleDescription',
      type: 'richText',
    },
    {
      name: 'orderIndex',
      type: 'number',
      defaultValue: 1,
      required: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'topics',
      type: 'relationship',
      relationTo: 'topics',
      hasMany: true,
      required: false,
    },
    {
      name: 'skillsXP',
      type: 'array',
      fields: [
        {
          name: 'skill',
          type: 'relationship',
          relationTo: 'skills',
          required: true,
        },
        {
          name: 'xp',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
  ],
  timestamps: true,
}
