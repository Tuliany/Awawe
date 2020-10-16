import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { user, login } from '../reducers/user'

export const Home = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const accessToken = useSelector((store) => store.user.login.accessToken)
  

   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   
   const handleLogin = event => {
    event.preventDefault()
    dispatch(login(name, password))
  }  

  useEffect (() => {
  if (accessToken) {
    history.push('/profile')
  } 
},[accessToken])



 if (!accessToken) {
  return (
    <div>
      <form className="login">
        <label>LOG IN!</label>
          
              <input type="text" placeholder="Name"required 
              value={name} onChange={event => setName(event.target.value)}/>
          
        
              <input type="password" placeholder="Password"required 
              value={password} onChange={event => setPassword(event.target.value)}/>
          
        <button type="submit" onClick={handleLogin}>
            Login
        </button>
      </form>
    </div>
  )
} 
else {
  //
  return <null/>
}
}

export default Home