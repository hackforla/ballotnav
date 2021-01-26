// downloads all the GA jurisdiction data from the api and stores in json file

const api = require('./api')
const fs = require('fs')

async function getJurisdictions() {
  const all = []
  for (let jid = 397; jid <= 555; jid++) {
    const data = await api.getJurisdiction(jid)
    all.push(data)
    console.log('saved:', jid)
  }
  fs.writeFileSync(`./data/jurisdictions.json`, JSON.stringify(all))
}

getJurisdictions()
