import * as Yup from 'yup'

export const ynuSelect = () => ({
  validate: Yup.string(),
  input: {
    select: true,
    options: [
      { value: 'Y', label: 'Yes' },
      { value: 'N', label: 'No' },
      { value: 'U', label: 'Unknown' },
    ],
  },
  defaultValue: 'U',
})
