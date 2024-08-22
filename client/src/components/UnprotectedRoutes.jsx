import { Route, Routes } from "react-router-dom"

import { Login } from "./public/Login"
import { PublicHeader } from "./public/PublicHeader"
import { Home } from "./public/Home"
import { Gallery } from "./shared/Gallery"
import { Register } from "./public/Register"
import { ContactForm } from "./public/ContactForm"
import { Thankyou } from "./public/Thankyou"
import { TheArtist } from "./public/TheArtist"
import { ArtDetail } from "./public/ArtDetail"


export const UnprotectedRoutes = () => {
    return (<>
        <PublicHeader/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/theartist' element={<TheArtist/>}/>
            <Route path='/gallery' element={<Gallery/>}/>
            <Route path='/gallery/:id' element={<ArtDetail/>}/>
            <Route path='/contact' element={<ContactForm/>}/>
            <Route path='/thankyou' element={<Thankyou/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/*' element={<Home/>}/>
        </Routes>
    </>)
}