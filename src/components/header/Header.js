import React from 'react';
import "./header.css";
import SchoolIcon from '@mui/icons-material/School';


function Header() {
  return (
    // <div>
    //   <SchoolIcon/>
    // </div>
    <div className='topbercontainer'>
        <div className="topLeft">
        <SchoolIcon className='school'/>
        <span className='topText'>The GradeBook</span>
        </div>
        <div className="topRightt">
        <span className='topTextRight'>Akanksha</span>
        <img src='./image/ak.jpg' alt='' className='topImg'/>

        </div>
    </div>
    
  )
}

export default Header
//<img src='/ak.jpg' alt='' className='topImg'/>
