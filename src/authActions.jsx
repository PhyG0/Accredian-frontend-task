import { createAction } from '@reduxjs/toolkit'
export const login = createAction('auth/login', function prepare(userName) {
  return {
    payload: {
      userName,
    },
  }
})
export const logout = createAction('auth/logout')
