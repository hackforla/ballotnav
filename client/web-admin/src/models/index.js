
const models = [
  {
    name: 'state',
    fields: require('./state'),
    children: [
      {
        name: 'jurisdiction',
        fields: require('./jurisdiction'),
        children: [
          {
            name: 'location',
            fields: require('./location'),
            children: [
              {
                name: 'location_hours',
                fields: require('./location_hours'),
              }
            ]
          },
          {
            name: 'jurisdiction_importantdate',
            fields: require('./jurisdiction_importantdate'),
          },
          {
            name: 'jurisdiction_infotab',
            fields: require('./jurisdiction_infotab'),
          },
          {
            name: 'jurisdiction_news',
            fields: require('./jurisdiction_news'),
          },
          {
            name: 'jurisdiction_notice',
            fields: require('./jurisdiction_notice'),
          },
          {
            name: 'jurisdiction_phone',
            fields: require('./jurisdiction_phone'),
          },
          {
            name: 'jurisdiction_url',
            fields: require('./jurisdiction_url'),
          }
        ]
      },
      {
        name: 'state_importantdate',
        fields: require('./state_importantdate'),
      },
      {
        name: 'state_infotab',
        fields: require('./state_infotab'),
      },
      {
        name: 'state_news',
        fields: require('./state_news'),
      },
      {
        name: 'state_notice',
        fields: require('./state_notice'),
      },
      {
        name: 'state_phone',
        fields: require('./state_phone'),
      },
      {
        name: 'state_url',
        fields: require('./state_url'),
      }
    ]
  }
]

export default models
