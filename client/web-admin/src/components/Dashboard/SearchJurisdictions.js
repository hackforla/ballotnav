import React, { useState, useEffect } from 'react'
import api from 'services/api'
import { Link } from 'react-router-dom'

function SearchJurisdictions() {
  const [jurisdictions, setJurisdictions] = useState([])

  useEffect(() => {
    // TODO: should list ALL jurisdictions in the state
    api.jurisdictions.list().then(setJurisdictions)
  }, [])

  return (
    <div>
      {jurisdictions.map((juris) => (
        <div key={juris.id}>
          <Link key={juris.id} to={`/jurisdictions/${juris.id}`}>
            {juris.name}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SearchJurisdictions
