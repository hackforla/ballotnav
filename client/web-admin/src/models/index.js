
const model = [{
  name: 'state',
  fields: require('./state'),
  children: [{
    name: 'jurisdiction',
    children: [{
      name: 'location',
      children: [{
        name: 'hours',
      }]
    },{
      name: 'importantdate',
    },{
      name: 'infotab',
    },{
      name: 'news',
    },{
      name: 'notice',
    },{
      name: 'phone',
    },{
      name: 'url'
    }]
  },{
    name: 'importantdate',
  },{
    name: 'infotab',
  },{
    name: 'news',
  },{
    name: 'notice',
  },{
    name: 'phone',
  },{
    name: 'url'
  }]
}]

export default model
