// collections/Courses.ts
import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  admin: {
    useAsTitle: 'courseTitle',
  },
  fields: [
    {
      name: 'courseTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'courseDescription',
      type: 'richText',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'courseLevel',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Intermediate', value: 'Intermediate' },
        { label: 'Advanced', value: 'Advanced' },
      ],
      defaultValue: 'Beginner',
    },
    {
      name: 'topic',
      type: 'text',
      required: true,
    },
    {
      name: 'instructor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      // In reality, only admins would set this field, or instructors could be chosen by admins
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Retired', value: 'retired' },
      ],
      defaultValue: 'published',
    },
  ],
  timestamps: true,
}
