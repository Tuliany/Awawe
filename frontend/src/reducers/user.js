import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    userName: null,
    accessToken: null  
  }
}

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      console.log(`Access Token: ${accessToken}`)
      state.login.accessToken = accessToken
    },
    setUserName: (state, action) => {
      const { userName } = action.payload
      console.log(`User name: ${userName}`)
      state.login.userName = userName
    }
  }
})

// THUNK 
export const login = (name, password) => {
  const LOGIN_URL = 'http://localhost:8080//login'
  return (dispatch, getState) => {
    fetch(`${LOGIN_URL}`, 
    {
        method: 'POST',
        body: JSON.stringify({name, password}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (!res.ok) {
          throw 'Unable to sign in. Please check you username and password'
        }
        return res.json()
      })
  }
}

export const signup = (name, password) => {
  const SIGNUP_URL = 'https://localhost:8080/signup'
  return (dispatch, getState) => {
    fetch(`${SIGNUP_URL}`, {
        method: 'POST',
        body: JSON.stringify({ name, password}),
        headers: { 'Content-Type': 'application/json'}
      })
      .then((res) => {
        if (!res.ok) {
          throw 'This name is already a member'
        }
        return res.json()
      })
  }
}


export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setAccessToken({ accessToken: null, userName: null }))
    dispatch(user.actions.setUserName({ userName: null }))
  }
}