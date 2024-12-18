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
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // If no slug is provided, generate one from courseTitle
            if (!data?.slug && data?.courseTitle) {
              return data.courseTitle
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
      name: 'courseDescription',
      type: 'richText',
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
