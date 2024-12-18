// collections/UserAchievements.ts
import type { CollectionConfig } from 'payload'

export const UserAchievements: CollectionConfig = {
  slug: 'user_achievements',
  access: {
    read: ({ req: { user } }) => !!user,
    create: ({ req: { user } }) => !!user,
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
      name: 'achievement',
      type: 'relationship',
      relationTo: 'achievements',
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
