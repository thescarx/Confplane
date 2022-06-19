import React,{useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import "../Notification.css"

function RapportPop({data2,data,trigger,pop,setPop}) {
  const navigate=useNavigate()
  useEffect(()=>{
    console.log(data)
  })
 
  const find_rev=(firstname,familyname,data)=>{
 let x= data.filter((rp)=>
  rp.user===firstname+" "+familyname)

  
   if (x.length===0) return 'not found'
   else return  x[0].id


  //   data.map((rp)=>{
  //     console.log(firstname+" "+familyname)
  //     if (rp.user===firstname+" "+familyname ){
  //       console.log(rp.id)
  //       return(rp.id)
  //       }
        
     

  // }

  
  // )
  }


    return trigger ? (
        <div className="popup">
          <div className="popup-inner2">
            <div className='txt-rapport-pop' > <h1>Consult Result</h1>  </div>
            <div className='choose-rev' >to consult reviewing result please choose a reviewer:</div>
              <div className='rapport-reviewers' >
          
        {data.map((item,k)=>(
          <div className='rapport-reviewer' key={k} >
             <p onClick={()=> {
// console.log(find_rev(item.first_name,item.family_name,data2))

 if (find_rev(item.first_name,item.family_name,data2)!=='not found'){
   navigate("/report/"+find_rev(item.first_name,item.family_name,data2))
  //  console.log('il ya rapport')

 }
 else{console.log('pas de rapport')}
            
            
            
            }
            
            }
             
             
             
             
             >{item.first_name} {item.family_name}</p> 
             </div>
                    //  <div key={k}>{item.first_name} {item.family_name}</div>

))}

                     
                  
              </div>
              <button onClick={()=>{setPop(false)}} >close</button>
          </div>
        </div>
      ) : (
        ""
      );

}

export default RapportPop