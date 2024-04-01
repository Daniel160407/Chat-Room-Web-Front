import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import './styles/style.scss'
import RoomsList from './components/RoomsList'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <RoomsList/>
  </React.StrictMode>,
)
