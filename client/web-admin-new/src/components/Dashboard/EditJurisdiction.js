import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from 'services/api'
import model from 'models/jurisdiction'
import AutoForm from './AutoForm'

function EditJurisdiction() {
  const { jid } = useParams()
  const [jurisdiction, setJurisdiction] = useState(null)

  useEffect(() => {
    api.jurisdictions.getById(jid).then(setJurisdiction)
  }, [jid])

  if (!jurisdiction) return null
  return (
    <>
      <AutoForm
        model={model}
        initialValues={null}
        onSubmit={(values, funcs) => {
          console.log(values)
          funcs.setSubmitting(false)
        }}
        style={{ maxWidth: 400 }}
      />
      <div>
        {jurisdiction.locations.map((loc) => (
          <div key={loc.id}>
            <Link to={`/jurisdictions/${jid}/locations/${loc.id}`}>
              {loc.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default EditJurisdiction
