import { configureStore } from '@reduxjs/toolkit'
import userSlide from './slides/userSlide'
import messageSlide from './slides/messageSlide'

export const store = configureStore({
  reducer: {
    user: userSlide,
    message: messageSlide
  },
})