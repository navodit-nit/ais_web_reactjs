import React,{useState,useEffect} from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import axios from "axios";
import auditNo from '../assets/svgs/audit_no.svg';
import location from '../assets/svgs/location.svg';
import department from '../assets/svgs/department.svg';
import plant_name from '../assets/svgs/plant_name.svg';
import { Link } from "react-router-dom";
import {ThreeCircles} from  'react-loader-spinner';


function convertThedateAndTime(e) {

  // var dateAndTime = new Date(e);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var dateAndTime = new Date(e ).toLocaleDateString('en-us',options);
  return dateAndTime;
}





function Audits() {
  const [showLoader, setShowLoader] = useState(false);
  // const startForContinue= {
  //   padding: '8px',
  //   background: '#4e4ed3',
  //   border: '1px solid #4e4ed3',
  //   color: 'white'
  // }
  const styleForStart= {
    padding: '8px',
    background: 'red',
    border: '1px solid #4e4ed3',
    color: 'white !important'
  }
 

const [audits,setAudits]=useState([])
useEffect(() => {
  var  allWithClass = document.getElementsByClassName('mainBody');
  allWithClass[0].classList.add('body') ;
  setShowLoader(true);
	fetchData();
}, [])
const fetchData=async()=>{
  // const response=await axios('/test.json');
  // var apiUrl = "https://polycab.dotvik.com/xmwpolycab/ais/api/listDueAuditsForAuditor"
  var apiUrl = "http://127.0.0.1:8001/api/listDueAuditsForAuditor"
  let body = {
        auditor_id: "109789",
        authToken: "1234567",
      };
      axios.post( apiUrl,body).then(response => {
        setAudits(response.data.data);  
        var  allWithClass = document.getElementsByClassName('mainBody');
        allWithClass[0].classList.remove('body') ;
        setShowLoader(false);  
      })
}



useEffect(() => {
  
}, [audits])
  return (
   <>
    <div className='mainBody'>
      {audits.map((d,index) => (
       <div className='container mt-5 mb-5' key={index} style={{width:'70%',boxShadow:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',borderRadius:'5px'}}>
       <div className='row pt-3'>
         <div className='col-9 md-2 d-flex'>
           <p className='px-1' style={{color:'#6c6565'}}> Standard</p>
           <p className='px-1'>{d.standard}</p>
         </div>
         <div className='col-3 md-2 d-flex'>
           <img width="35" height="35" src="https://img.icons8.com/ios-glyphs/100/808080/in-progress.png" alt="in-progress"/>
         <h4 className='px-1'>{d.status}</h4>
         </div>
       </div>
     <div className='row pt-3'>
       <div className='col-3 md-2 d-flex'>
       <img  src={auditNo} alt="in-progress"/>

       <h5 className='px-2'>{d.audit_no}</h5>
       </div>
       <div className='col-3 md-2 d-flex'>
      
       <img width='35' height="35" src={plant_name}   alt="alternative text"/>

       <h5 className='px-2'>{d.plant_name}</h5>
       </div>
       <div className='col-3 md-2 d-flex'>
       <img width='35' height="35" src={location}   alt="alternative text"/>
       <h5 className='px-2'> {d.locaiton_name}</h5>
       </div>
       <div className='col-3 md-2 d-flex'>
       <img width='35' height="35" src={department}   alt="alternative text"  />
       <h5 className='px-2'>{d.department_name}</h5>
       </div>
     </div>
     <div className='row pt-3 pb-3'>
       <div className='col-6 d-flex'>
         <h5 className='px-1' style={{color:'#6c6565'}}>From</h5>
         <h5 className='px-1'>{convertThedateAndTime(d.start_date)}</h5>
       </div>
       <div className='col-6 md-2 d-flex'>
         <h5 className='px-1' style={{color:'#6c6565'}}>To</h5>
         <h5 className='px-1'> {convertThedateAndTime(d.end_date)}</h5>
         </div>
     </div>
     <Link to={{pathname:`/questions`,search:`?id=${d.audit_instance_id}&&d=${d.department_code}`}} className='startButton'  >
     <div className='row'   >
       <button style={styleForStart}> <Link to={{pathname:`/questions`,search:`?id=${d.audit_instance_id}&&d=${d.department_code}`}} className='startButton'  > START </Link>  </button>
       </div>
      </Link>
   
   </div>
        ))}
   
    </div>
    <ThreeCircles
         height="100"
        width="100"
        color="red"
        wrapperStyle={{}}
        wrapperClass="loader1"
        visible={showLoader}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
/> 
    </>
  )
}

export default Audits