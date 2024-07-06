// authReducer.js
import { createReducer } from '@reduxjs/toolkit'
import { login, logout } from './authActions.jsx'

const initialState = {
  isLoggedIn: false,
  userName: null,
}

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.isLoggedIn = true
      state.userName = action.payload.userName
    })
    .addCase(logout, (state) => {
      state.isLoggedIn = false
      state.userName = null
    })
})

export default authReducer
