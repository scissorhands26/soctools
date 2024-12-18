// collections/DiscussionThreads.ts
import type { CollectionConfig } from 'payload'

export const DiscussionThreads: CollectionConfig = {
  slug: 'discussion_threads',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
    delete: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
  },
  fields: [
    {
      name: 'module',
      type: 'relationship',
      relationTo: 'modules',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'threadTitle',
      type: 'text',
      required: true,
    },
  ],
  timestamps: true,
}
