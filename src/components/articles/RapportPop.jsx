import React from 'react'
import "../Notification.css"

function RapportPop({data,trigger,pop,setPop}) {
                  console.log(data)

    return trigger ? (
        <div className="popup">
          <div className="popup-inner">
              <div reviewers_article >
                 <ul className='reviewers_article_list' >
                 {data.map((item,k)=>{
                     <li key={k}>{item.first_name} {item.family_name}</li>

})}
                     
                     
                     </ul> 
                  
              </div>
              <button onClick={()=>{setPop(false)}} >close</button>
          </div>
        </div>
      ) : (
        ""
      );

}

export default RapportPop