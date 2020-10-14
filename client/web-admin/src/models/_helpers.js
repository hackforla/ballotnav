export const DataTypes = {
  INTEGER: 'text',
  TEXT: 'text',
  BOOLEAN: {
    type: 'select',
    options: [
      { value: true, display: 'true' },
      { value: false, display: 'false' },
    ],
  },
  ENUM: (...opts) => ({
    type: 'select',
    options: opts.map(opt => ({
      value: opt,
      display: opt,
    }))
  }),
  GEOMETRY: (...values) => null,
  DATE: 'date',
}

export const Deferrable = {
  INITIALLY_DEFERRED: null,
}
