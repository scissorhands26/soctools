// collections/Modules.ts
import type { CollectionConfig } from 'payload'

export const Modules: CollectionConfig = {
  slug: 'modules',
  access: {
    read: () => true,
    create: ({ req: { user } }) =>
      Boolean(user?.role && ['admin', 'instructor'].includes(user.role)),
    update: ({ req: { user } }) =>
      Boolean(user?.role && ['admin', 'instructor'].includes(user.role)),
    delete: ({ req: { user } }) =>
      Boolean(user?.role && ['admin', 'instructor'].includes(user.role)),
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
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // If no slug is provided, generate one from moduleTitle
            if (!data?.slug && data?.moduleTitle) {
              return data.moduleTitle
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .concat('-', Math.floor(Math.random() * 1000).toString()) // Add random number for uniqueness
            }
            return data?.slug
          },
        ],
      },
      unique: true, // Ensure slugs are unique
      index: true, // Add database index for faster queries
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
