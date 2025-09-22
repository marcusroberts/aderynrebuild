import { defineField, defineType } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Navigation',
      readOnly: true,
    }),
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                {
                  name: 'type',
                  title: 'Link Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Page', value: 'page' },
                      { title: 'Service', value: 'service' },
                      { title: 'External URL', value: 'external' },
                      { title: 'Custom Path', value: 'custom' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'page',
                  title: 'Page',
                  type: 'reference',
                  to: [{ type: 'page' }],
                  hidden: ({ parent }) => parent?.type !== 'page',
                },
                {
                  name: 'service',
                  title: 'Service',
                  type: 'reference',
                  to: [{ type: 'service' }],
                  hidden: ({ parent }) => parent?.type !== 'service',
                },
                {
                  name: 'external',
                  title: 'External URL',
                  type: 'url',
                  hidden: ({ parent }) => parent?.type !== 'external',
                },
                {
                  name: 'custom',
                  title: 'Custom Path',
                  type: 'string',
                  description: 'e.g., /contact-us',
                  hidden: ({ parent }) => parent?.type !== 'custom',
                },
              ],
            },
            {
              name: 'subItems',
              title: 'Sub Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'object',
                      fields: [
                        {
                          name: 'type',
                          title: 'Link Type',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Page', value: 'page' },
                              { title: 'Service', value: 'service' },
                              { title: 'External URL', value: 'external' },
                              { title: 'Custom Path', value: 'custom' },
                            ],
                          },
                          validation: (Rule) => Rule.required(),
                        },
                        {
                          name: 'page',
                          title: 'Page',
                          type: 'reference',
                          to: [{ type: 'page' }],
                          hidden: ({ parent }) => parent?.type !== 'page',
                        },
                        {
                          name: 'service',
                          title: 'Service',
                          type: 'reference',
                          to: [{ type: 'service' }],
                          hidden: ({ parent }) => parent?.type !== 'service',
                        },
                        {
                          name: 'external',
                          title: 'External URL',
                          type: 'url',
                          hidden: ({ parent }) => parent?.type !== 'external',
                        },
                        {
                          name: 'custom',
                          title: 'Custom Path',
                          type: 'string',
                          description: 'e.g., /services/building-surveys',
                          hidden: ({ parent }) => parent?.type !== 'custom',
                        },
                      ],
                    },
                  ],
                  preview: {
                    select: {
                      title: 'title',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subItems.length',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle ? `${subtitle} sub-items` : 'No sub-items',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
