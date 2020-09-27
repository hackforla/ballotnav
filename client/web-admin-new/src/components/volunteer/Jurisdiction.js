import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from 'services/api'

function Jurisdiction() {
  const { id } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)

  useEffect(() => {
    api.jurisdictions.getById(id).then(setJurisdiction)
  }, [id])

  if (!jurisdiction) return null
  return (
    <>
      <div>{ jurisdiction.id }</div>
      <div>
        {jurisdiction.locations.map(loc => (
          <div key={loc.id}>
            <Link to={`/jurisdictions/${id}/location/${loc.id}`}>{ loc.name }</Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Jurisdiction
