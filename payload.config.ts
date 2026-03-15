// payload.config.ts
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  
  editor: lexicalEditor({}),
  
  collections: [
    {
      slug: 'daily-entries',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
        {
          name: 'latitude',
          type: 'number',
          required: true,
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
        },
        {
          name: 'diary',
          type: 'richText',
        },
        {
          name: 'weather',
          type: 'text',
        },
        {
          name: 'distanceMiles',
          type: 'number',
        },
      ],
    },
  ],
  
  typescript: {
    outputFile: 'payload-types.ts',
  },
})
