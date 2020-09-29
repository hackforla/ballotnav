
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
                name: 'hours',
                fields: require('./location_hours'),
              }
            ]
          },
          {
            name: 'importantdate',
            fields: require('./jurisdiction_importantdate'),
          },
          {
            name: 'infotab',
            fields: require('./jurisdiction_infotab'),
          },
          {
            name: 'news',
            fields: require('./jurisdiction_news'),
          },
          {
            name: 'notice',
            fields: require('./jurisdiction_notice'),
          },
          {
            name: 'phone',
            fields: require('./jurisdiction_phone'),
          },
          {
            name: 'url',
            fields: require('./jurisdiction_url'),
          }
        ]
      },
      {
        name: 'importantdate',
        fields: require('./state_importantdate'),
      },
      {
        name: 'infotab',
        fields: require('./state_infotab'),
      },
      {
        name: 'news',
        fields: require('./state_news'),
      },
      {
        name: 'notice',
        fields: require('./state_notice'),
      },
      {
        name: 'phone',
        fields: require('./state_phone'),
      },
      {
        name: 'url',
        fields: require('./state_url'),
      }
    ]
  }
]

export default models
