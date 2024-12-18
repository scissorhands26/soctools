// collections/DiscussionPosts.ts
import type { CollectionConfig } from 'payload'

export const DiscussionPosts: CollectionConfig = {
  slug: 'discussion_posts',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => user?.role === 'admin', // or allow users to edit their own posts
    delete: ({ req: { user } }) => ['admin', 'instructor'].includes(user?.role),
  },
  fields: [
    {
      name: 'thread',
      type: 'relationship',
      relationTo: 'discussion_threads',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'postContent',
      type: 'richText',
      required: true,
    },
    {
      name: 'likes',
      type: 'number',
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
