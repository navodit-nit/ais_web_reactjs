import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import {useState} from 'react';
import dashboard from '../assets/svgs/dashboard.svg';
import home from '../assets/svgs/Home.svg';
import setting from '../assets/svgs/Setting.svg';
import audits from '../assets/svgs/Audits.svg';
import { useNavigate} from 'react-router-dom';



function NavSection() {
  const navigate = useNavigate();
  function handleNavClick(e){
    var  allWithClass = Array.from(
      document.getElementsByClassName('nav1')
    );
    allWithClass.forEach(element => {
     if(e.target.innerHTML == element.innerHTML){
      element.classList.add('activeClass');
      console.log(element.innerHTML);
      if(element.innerHTML.includes('Dashboard')){
        navigate('/dashboard');
      }
      else if (element.innerHTML.includes('Home')){
        navigate('/home');
      }
      else if (element.innerHTML.includes('Audits')){
        navigate('/audits');
      }
      else if (element.innerHTML.includes('Setting')){
        navigate('/setting');
      }
     }
     else{
      element.classList.remove('activeClass')
     }
    });
    
  }

  return (
    <>
    <div className='row' style={{background:'#EE4145'}}>
        <div className='col-md-7'>
          <h2 style={{color:'white',marginLeft:'30px',marginTop:'5px'}} >AIS</h2>
        </div>
        <div className='col-md-3' style={{background:'#D30E13', color:'white'}}>
              <div style={{display:'flex'}} >
                <img width="30" height="30" src="https://img.icons8.com/ios/50/FFFFFF/user-male-circle--v1.png" alt="user-male-circle--v1"/>               <div>
                  <div style={{marginLeft:'20px'}}>
                  <p style={{marginBottom:'2px'}}>Mr.Santosh Kumar</p>
                  <p style={{marginBottom:'2px'}}>104103</p>
                  </div>
               </div>
            </div>
         </div>
         <div className='col-md-2  mt-2  d-flex justify-content-evenly'>
          <div>
          <Button variant="outline-light"  href="/"   >
             Logout
            </Button>
          </div>
          <div>
          <img width="30" height="30" src="https://img.icons8.com/ios/50/FFFFFF/appointment-reminders--v1.png" alt="appointment-reminders--v1"/>
          </div>
        </div>

    </div>
    
    <Nav fill variant="tabs"  style={{background:'#353535',color:'white'}}>
      <Nav.Item>
        <Nav.Link  className='nav1'  onClick={(e)=>{handleNavClick(e)}}  eventKey="Dashboard" >  <img width='35' height="35" src={dashboard}  />  Dashboard
          </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link   className='nav1'  onClick={(e)=>{handleNavClick(e)}}     eventKey="Home"> <img width='35' height="35" src={home}  />  Home
          </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link  className='nav1' onClick={(e)=>{handleNavClick(e)}}    eventKey="Audits">  <img width='35' height="35" src={audits}  />  Audits
          </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link   className='nav1' onClick={(e)=>{handleNavClick(e)}}    eventKey="Setting" >  <img width='35' height="35" src={setting}  /> Setting
        </Nav.Link>
      </Nav.Item>
    </Nav>
   
    
    </>
  );
}

export default NavSection;