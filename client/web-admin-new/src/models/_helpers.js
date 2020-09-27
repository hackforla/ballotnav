export const DataTypes = {
  INTEGER: 'text',
  TEXT: 'text',
  BOOLEAN: {
    type: 'select',
    options: ['true', 'false']
  },
  ENUM: (...options) => ({
    type: 'select',
    options,
  }),
  GEOMETRY: (...values) => null,
  DATE: 'date',
}

export const Deferrable = {
  INITIALLY_DEFERRED: null,
}
