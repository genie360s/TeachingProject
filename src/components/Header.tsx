
import React from "react"
import HeadSub from"./HeadSub";


const Header = (props) => {

  
  return (
    <>
     <header className="heder_nav">
                <div className='box_vc_nav_right'>
                    <h4>{props.title}</h4>
                </div>
                <div className='box_vc_nav_left'>
                 
                    <HeadSub/>

                </div>
      </header>
    
    </>
  )
}


export default Header
