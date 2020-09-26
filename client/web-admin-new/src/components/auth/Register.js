import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'components/use-auth'
import { useFormik } from 'formik'
import { useToast } from 'components/use-toast'

function Register() {
  const { register } = useAuth()
  const toast = useToast()
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      firstName: 'jake',
      lastName: 'mensch',
      email: 'jake.mensch@gmail.com',
      password: 'hellothere1',
    },
    onSubmit(values) {
      register(values).catch(error => {
        if (error.duplicateEmail)
          toast({ message: 'email already registered' })
        else if (error.unknownError)
          toast({ message: 'unknown error creating account' })
      })
    }
  })
  return (
    <div>
      <div>Registration Page</div>
      <form onSubmit={handleSubmit}>
        <input name="firstName" onChange={handleChange} />
        <input name="lastName" onChange={handleChange} />
        <input name="email" onChange={handleChange} />
        <input name="password" onChange={handleChange}  />
        <button type="submit">submit</button>
      </form>
      <Link to='/login'>login</Link>
    </div>
  )
}

export default Register
