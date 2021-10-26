import { Button } from '@mui/material'
import React from 'react'
import image404 from './assets/mYKbf3DSinvWnEzmHkEnCE-970-80.jpg.webp'
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
    return (
     <div>
       <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
        <img src={image404} alt='Page not found!'></img>
         
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
          <Button component={Link} to = "/blog">Go Back to prevous page</Button>            
        </div>
     </div>  
    )
}
export default NotFoundPage