/*
  A sortable table. Props are:

  1. data
    An array of objects. Each object is a row in the table.

  2. columns
    An array of objects. Each object corresponds to, and configures, a column
    in the table. Table columns are in the same order as the columns prop.

    These are the fields in the object.

    {
      title,
      field,
      render,
      sort,
    }

    a. title (optional)
      The string in the th element.

    b. field (optional)
      The name of the property in each object.

    c. render (optional)
      A function that renders an individual table cell. It takes two arguments:
        1. fieldValue = data[rowIndex][field]
        2. record = data[rowIndex]

      If a render function not provided, the fieldValue is rendered as is.

    d. sort (optional)
      Whether the column is sortable. Sort can take three values:
        1. false (the default)
          No sorting on the column.
        2. true
          The column is sorted via a default comparator:
            (a, b) => b[field] > a[field] ? 1 : -1
        3. a comparator function

  3. keyExtractor
    This determines the key for the row. Defaults to: (row) => row.id
*/

import Table from './Table'
export default Table
