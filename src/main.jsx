import React from 'react'
import Header from './components/Header'
import './styles/style.scss'
import RoomsList from './components/RoomsList'
import root from './script/root'

root.render(
  <React.StrictMode>
    <Header />
    <RoomsList/>
  </React.StrictMode>,
)
