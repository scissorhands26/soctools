// collections/UserBadges.ts
import type { CollectionConfig } from 'payload'

export const UserBadges: CollectionConfig = {
  slug: 'user_badges',
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user, // user earns a badge
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'badge',
      type: 'relationship',
      relationTo: 'badges',
      required: true,
    },
    {
      name: 'earnedDate',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
    },
  ],
  timestamps: true,
}
