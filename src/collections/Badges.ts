// collections/Badges.ts
import type { CollectionConfig } from 'payload'

export const Badges: CollectionConfig = {
  slug: 'badges',
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  timestamps: true,
}
