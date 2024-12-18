// collections/Enrollments.ts
import type { CollectionConfig } from 'payload'

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user, // Students self-enroll
    update: ({ req: { user } }) => !!user, // Maybe restricted logic needed
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
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'enrollmentDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'active',
      required: true,
    },
  ],
  timestamps: true,
}
