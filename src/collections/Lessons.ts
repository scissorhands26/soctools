// collections/Lessons.ts
import type { CollectionConfig } from 'payload'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  access: {
    read: () => true,
    create: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
    update: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
    delete: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
  },
  fields: [
    {
      name: 'lessonTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'lessonContent',
      type: 'richText',
      required: true,
    },
    {
      name: 'lessonType',
      type: 'select',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Text', value: 'text' },
        { label: 'Interactive', value: 'interactive' },
        { label: 'Lab', value: 'lab' },
      ],
      defaultValue: 'text',
    },
    {
      name: 'orderIndex',
      type: 'number',
      defaultValue: 1,
      required: true,
    },
    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules',
      required: true,
    },
    {
      name: 'resources',
      type: 'array',
      fields: [
        {
          name: 'resourceTitle',
          type: 'text',
        },
        {
          name: 'resourceType',
          type: 'select',
          options: [
            { label: 'PDF', value: 'pdf' },
            { label: 'Link', value: 'link' },
            { label: 'Document', value: 'document' },
            { label: 'Tool', value: 'tool' },
            { label: 'Code Sample', value: 'code_sample' },
          ],
          defaultValue: 'link',
        },
        {
          name: 'resourceURL',
          type: 'text',
        },
        {
          name: 'resourceFile',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  timestamps: true,
}
