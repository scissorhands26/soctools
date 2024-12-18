// collections/ActivityLogs.ts
import type { CollectionConfig } from 'payload'

export const ActivityLogs: CollectionConfig = {
  slug: 'activity_logs',
  access: {
    read: ({ req: { user } }) => user?.role === 'admin', // only admin can read logs
    create: () => false, // logs likely created by hooks/server code
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'actionType',
      type: 'text',
      required: true,
    },
    {
      name: 'metadata',
      type: 'json',
      required: false,
    },
  ],
  timestamps: true,
}
