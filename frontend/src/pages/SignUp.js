import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { user,signup } from '../reducers/user'

export const SignUp = () => {
  const history = useHistory ()
  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = event => {
    event.preventDefault()
    dispatch(signup(name, password))
  }
 
  useEffect (() => {
    if (accessToken) {
      history.push('/profile')
    }
  })

  
  return (
    <div>
      <form>
          <div class="form-group">
            <input type="text" placeholder="Name"required 
            value={name} onChange={event => setName(event.target.value)}/>
      
            <input type="password" placeholder="Password"required 
            value={password} onChange={event => setPassword(event.target.value)}/>
          
      <button type="submit" onClick={handleSignup}>
        Submit
      </button> 
      </div>
    </form>
  
  </div>
  )
}