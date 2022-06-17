import React from 'react'
import '../Signup/Form.css'

function Login_Form({user,pwd,setUser,setPwd,formErrors}) {
  return (
<div className='form1'>
          
        <input className='form_inputs2' type="email" placeholder='Email' 
         value={user} onChange={(e)=>{setUser(e.target.value) }}/> 
         {formErrors.email && <p className='err' >{formErrors.email}</p>}
        <input className='form_inputs2' type="password" placeholder='Password'
         value={pwd} onChange={(e)=>{setPwd(e.target.value) }} />
         {formErrors.password && <p className='err' >{formErrors.password}</p>}


  
  

      
      
    </div>
  )
}

export default Login_Form