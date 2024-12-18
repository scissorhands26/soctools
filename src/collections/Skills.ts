// collections/Skills.ts
import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  access: {
    read: () => true,
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
      required: true,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media', // Assuming a media collection for icons
      required: false,
    },
  ],
  timestamps: true,
}
