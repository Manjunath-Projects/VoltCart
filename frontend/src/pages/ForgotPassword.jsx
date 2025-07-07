import React from 'react'
import { Link} from 'react-router-dom'
import "../style/forgotPassword.css"

const ForgotPassword = () => {
  return (
    <div>
      <div className='para'>
        <p>Try to Contact Store Owner</p>
        <Link to="/contact" >
        <button>Contact</button>
         </Link> 
      </div>
    </div>
  )
}

export default ForgotPassword
