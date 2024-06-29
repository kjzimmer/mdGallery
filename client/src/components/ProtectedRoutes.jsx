import { Routes, Route } from "react-router-dom"
import { Navigate, Outlet } from 'react-router-dom'

import { AdminHeader } from "./admin/AdminHeader"
import { Admin } from "./admin/Admin"
import { Artwork } from "./shared/Artwork"
import { AddArt } from "./admin/AddArt"
import { ArtForm } from "./admin/ArtForm"
import { paintingServices } from "../services/paintingServices"
import { Contacts } from "./admin/Contacts"

const PrivateRoutes = () => {
    const token = localStorage.getItem('userToken')

    return (
    token ? <Outlet/> : <Navigate to='/'/>
  )
}

export const ProtectedRoutes = () => {
    return (<>
    <AdminHeader/>
    <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path='/art' element={<Artwork/>}/>
            <Route path='/artwork/add' element={<ArtForm submitForm={paintingServices.create}/>}/>
            <Route path='/artwork/edit/:id' element={<ArtForm submitForm={paintingServices.update}/>}/>
            <Route path='/contacts/' element={<Contacts/>}/>
            <Route path='/*' element={<Artwork/>}/>
        </Route>
    </Routes>
    </>)
}