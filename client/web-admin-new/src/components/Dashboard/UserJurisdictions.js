import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from 'services/api'

function Jurisdictions() {
  const [jurisdictions, setJurisdictions] = useState([])

  useEffect(() => {
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

export default Jurisdictions
