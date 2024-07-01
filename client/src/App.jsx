import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UnprotectedRoutes } from './components/UnprotectedRoutes'
import { ProtectedRoutes } from './components/ProtectedRoutes'



function App() {
  return (
    <>
    <h1>Melody Debenedictis Fine Art</h1>
    <Routes>
      <Route path='/admin/*' element={<ProtectedRoutes/>}/>
      <Route path='/*' element={<UnprotectedRoutes/>}/>
    </Routes>
    </>
  )
}

export default App
