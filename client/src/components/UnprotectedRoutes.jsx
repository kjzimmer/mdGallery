import { Route, Routes } from "react-router-dom"

import { Login } from "./public/Login"
import { PublicHeader } from "./public/PublicHeader"
import { Home } from "./public/Home"
import { Artwork } from "./shared/Artwork"
import { Register } from "./public/Register"
import { ContactForm } from "./public/ContactForm"


export const UnprotectedRoutes = () => {
    return (<>
        <PublicHeader/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/artwork' element={<Artwork/>}/>
            <Route path='/contact' element={<ContactForm/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/*' element={<Home/>}/>
        </Routes>
    </>)
}