// collections/UserSkills.ts
import type { CollectionConfig } from 'payload'

export const UserSkills: CollectionConfig = {
  slug: 'user_skills',
  access: {
    read: ({ req: { user } }) => {
      // Everyone can read user skills, or you could restrict:
      // return !!user; // only logged in users can read
      return true
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'skill',
      type: 'relationship',
      relationTo: 'skills',
      required: true,
    },
    {
      name: 'xp',
      type: 'number',
      defaultValue: 0,
      required: true,
    },
  ],
  timestamps: true,
  hooks: {
    // Could add hooks later for XP updates
  },
}
