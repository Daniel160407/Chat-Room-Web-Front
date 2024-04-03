import React from 'react'
import Header from './components/Header'
import './styles/style.scss'
import RoomsList from './components/RoomsList'
import root from './script/root'
import Chat from './components/Chat'
import ChatHeader from './components/ChatHeader'

root.render(
  <React.StrictMode>
    <Header />
    <RoomsList/>
  </React.StrictMode>,
)
