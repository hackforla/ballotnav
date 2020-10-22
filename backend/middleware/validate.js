// schema validation middleware
// see https://express-validator.github.io/docs/schema-validation.html

const { checkSchema, validationResult } = require('express-validator')

function validate(schema) {
  return async (req, res, next) => {
    await Promise.all(
      checkSchema(schema).map((validation) => validation.run(req))
    )

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}

module.exports = validate
