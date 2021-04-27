// downloads jurisdiction data from the api and stores in json files

const api = require('./api')
const fs = require('fs')
const path = require('path')

// PUT RANGE OF JURISIDICTION ID'S HERE: 
const FIRST_JID = 397
const LAST_JID = 555

const OUT = path.join(__dirname, 'data')

async function getJurisdictions() {
  const all = []
  for (let jid = FIRST_JID; jid <= LAST_JID; jid++) {
    const data = await api.getJurisdiction(jid)
    all.push(data)
    console.log(`retrieved jurisdiction with id: ${jid}`)
  }

  console.log('writing jurisdictions.json')
  fs.writeFileSync(
    `${OUT}/jurisdictions.json`,
    JSON.stringify(all, null, 2)
  )
}

async function getStatesAndJurisdictions() {
  const data = await api.getStatesWithJurisdictions()

  console.log('writing statesAndJurisdictions.json')
  fs.writeFileSync(
    `${OUT}/statesAndJurisdictions.json`,
    JSON.stringify(data, null, 2)
  )
}

;(async () => {
  await getJurisdictions()
  await getStatesAndJurisdictions()
})()
