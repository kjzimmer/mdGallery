import { Routes, Route } from "react-router-dom"
import { Navigate, Outlet } from 'react-router-dom'

import { AdminHeader } from "./admin/AdminHeader"
import { Artwork } from "./shared/Artwork"
import { ArtForm } from "./admin/ArtForm"
import { paintingServices } from "../services/paintingServices"
import { Contacts } from "./admin/Contacts"
import { Profile } from "./admin/Profile"
import { Security } from "./admin/Security"
import { Other } from "./admin/Other"

const PrivateRoutes = () => {
    const token = localStorage.getItem('userToken')

    return (
    token ? <Outlet/> : <Navigate to='/login'/>
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
            <Route path='/profile/' element={<Profile/>}/>
            <Route path='/security/' element={<Security/>}/>
            <Route path='/other/' element={<Other/>}/>
            <Route path='/*' element={<Artwork/>}/>
        </Route>
    </Routes>
    </>)
}