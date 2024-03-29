import React, { useEffect, useState } from "react";
import "../assets/style.css";
import axios from "axios";
import ProgressBar from "./progressBar.js";
import { useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom';
import {ThreeCircles} from  'react-loader-spinner';





function Question2() {
  const [showLoader, setShowLoader] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (e,refid) =>{
    if (validateForm(formData)) {
    setLastQuesRefid(refid);
    setShow(true);
    }
    else{
      toast("Please Fill All Fields.");
    }
  } 
  const location = useLocation();
  const [formData, setFormData] = useState({
    authorRes: "",
    attachmentImg: "",
    btnOption: "",
  });
  const [errors, setErrors] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [quesNo, setQuestionNo] = useState();
  const [index, setIndex] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [lastQuesRefid, setLastQuesRefid] = useState(0);
  const [id, setId] = useState();
  var allWithClass=null;
  useEffect(() => {
    var  allWithClass = document.getElementsByClassName('mainBody');
  allWithClass[0].classList.add('body') ;
  setShowLoader(true);
      fetchData();
  }, [])
  

  const fetchData=async()=>{
   
    // const response=await axios('/test.json');
    const idFromParam = new URLSearchParams(location.search).get('id');
    const department_code = new URLSearchParams(location.search).get('d');
    var authToken = "AUTH_TOKEN";
    var apiUrlForAuditQuestions = "http://127.0.0.1:8001/api/listAuditQuestionsForAuditInstance";
    // var apiUrlForAuditQuestions = "https://polycab.dotvik.com/xmwpolycab/ais/api/listAuditQuestionsForAuditInstance";
    // let body = new FormData();
    // body.append("audit_instance_id", idFromParam);
    // body.append("department_code", department_code);
    // body.append("authToken", authToken);
        let body = {
                audit_instance_id: idFromParam,
                department_code: department_code,
               authToken: "AUTH_TOKEN",
        };
        axios.post(apiUrlForAuditQuestions,body).then(response => {
          
          setId(idFromParam);
          setCurrentQuestion(response.data.data);
          var  quesList = "questionList"+idFromParam;
          sessionStorage.setItem(quesList, JSON.stringify(response.data.data));  
          setQuestionCount(response.data.count); 
          var  allWithClass = document.getElementsByClassName('mainBody');
          allWithClass[0].classList.remove('body') ;
          setShowLoader(false)
        })
  } 

 
  function handleBelowButtonClick(e){
        e.preventDefault();
        setFormData({
          ...formData,
          btnOption: e.target.innerHTML,
        });
        allWithClass = Array.from(
          document.getElementsByClassName('buttons')
        );
        allWithClass.forEach(element => {
         if(e.target.innerHTML == element.innerHTML){
          element.classList.add('active-button')
         }
         else{
          element.classList.remove('active-button')
         }
        });
        
}
  function handelNextClick(e,refid) {
    e.preventDefault()
    if (index < currentQuestion.length - 1){
      var a = validateForm;
      if (validateForm(formData)) {
        var ques = "id"+ id+"ques"+index;
        const obj = { authorRes: formData.authorRes, attachmentImg: formData.attachmentImg, btnOption:formData.btnOption,questionId:refid};
        sessionStorage.setItem(ques, JSON.stringify(obj));
        formData.authorRes='';
        formData.attachmentImg ='';
        formData.btnOption = '';
        allWithClass = Array.from(
          document.getElementsByClassName('buttons')
        );
        allWithClass.forEach(element => {
           element.classList.remove('active-button')
         });
        setIndex(index + 1 );
        const url = new URL(window.location);
        url.searchParams.set('qid', "value");
        window.history.pushState(null, '', url.toString());
        var i = index+1
        var key = "id"+id+'ques'+i;
         var answer =null;
         answer= JSON.parse(sessionStorage.getItem(key));
        if(answer != null){
          formData.authorRes=answer.authorRes;
        formData.attachmentImg =answer.attachmentImg;
        formData.btnOption = answer.btnOption;
        allWithClass = Array.from(
          document.getElementsByClassName('buttons')
        );
        allWithClass.forEach(element => {
         if(answer.btnOption == element.innerHTML){
          element.classList.add('active-button')
         }
         else{
          element.classList.remove('active-button')
         }
        });
        }

       } 
    }

  }
  function handelPreviousClick(e){
    e.preventDefault();
    if(index >0 ){
      var i = index-1 ;
      var key = "id"+id+'ques'+i;
      // var authorRes1 = sessionStorage.getItem(key);
      var answer= JSON.parse(sessionStorage.getItem(key));
      formData.authorRes = answer.authorRes;
      formData.btnOption = answer.btnOption; 
      formData.attachmentImg = answer.attachmentImg; 
       allWithClass = Array.from(
          document.getElementsByClassName('buttons')
        );
        allWithClass.forEach(element => {
         if(answer.btnOption == element.innerHTML){
          element.classList.add('active-button')
         }
         else{
          element.classList.remove('active-button')
         }
        });
      setIndex(index-1);
    }
  }
  

  useEffect(() => {
     var a = currentQuestion[index]?.refid;
    //  console.log(a);
     const url = new URL(window.location);
    //  url.searchParams.set('qid', a);
    //  url.searchParams.set('i', index);
    //  window.history.pushState(null, '', url.toString());
    //  const indexFromParam = new URLSearchParams(location.search).get('i');
    //  setIndex(indexFromParam);


  })
  // const [isValid, setIsValid] = useState(false);

  // function validate() {
  //   // Validate Author Response
  //   if (formData.authorRes === "") {
  //     setIsValid(true);
  //   } else {
  //     setIsValid(false);
  //   }
  //   // Validate Button
  //   if (formData.btnOption === "") {
  //     setIsValid(true);
  //   } else {
  //     setIsValid(false);
  //   }
  // }

  const validateForm = (f) => {
    let isValid = true;
    const newErrors = {};
    var btnOptionAvailable = false;
    var attachAvailable = false;
    var subjectiveAvailable = false;
    currentQuestion[index]?.auditor_options.forEach((element)=>{
      if(element.response_type == 'single'){btnOptionAvailable = true;}
      if(element.response_type == 'attachement'){attachAvailable = true;}
      if(element.response_type == 'subjective'){subjectiveAvailable = true;}
    })
    if (!f.authorRes  && subjectiveAvailable) {
      newErrors.authorRes = " Enter Text Here..";
      isValid = false;
    }
      if (!f.btnOption  && btnOptionAvailable  ) {
      newErrors.btnOption = "Please Select Required Button";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (validateForm) {
     // console.log("Form data:", formData);
    } else {
    }  };

  // useEffect(() => {
  //   validate()
  // }, [formData])
  // var q = currentQuestion[i];
  function handleSubmitButton(){
    // var apiUrlForCapturingResponse = "https://polycab.dotvik.com/xmwpolycab/ais/api/test/captureResponseBulk"
    var apiUrlForCapturingResponse = "http://127.0.0.1:8001/api/test/captureResponseBulk"
    var arrToSend =[];
    const idFromParam = new URLSearchParams(location.search).get('id');
    if (validateForm(formData)) {
    for(let i = 0;i<questionCount-1;i++){
      var key = "id"+idFromParam+'ques'+i;
      var answer= JSON.parse(sessionStorage.getItem(key));
      var auditor_subjective=[];
      var auditor_single=[];
      if(answer.authorRes != null && answer.authorRes != undefined && answer.authorRes != ""){
         var a  = "2_"+answer.authorRes;
         auditor_subjective.push(a);
      }else{auditor_subjective = [] }
      if(answer.btnOption != null && answer.btnOption != undefined && answer.btnOption != ""){
        var b    = "4_"+ answer.btnOption;
        auditor_single.push(b);
      }
      else{ auditor_single = []}
      var obj1 = {
        "authToken": "AUTH_TOKEN",
        "auditor_id": "109789",
        "question_refid": answer.questionId,
        "audit_in_exe_refid": idFromParam,
        "auditee_name": "Test Auditee",
        "auditee_multi": [],
        "auditee_single": [],
        "auditee_boolean": [],
        "auditee_attachement": [],
        "auditee_subjective": [],
        "auditor_multi": [],
        "auditor_single": auditor_single,
        "auditor_boolean": [],
        "auditor_attachement": [],
        "auditor_subjective": auditor_subjective
      }
      arrToSend.push(obj1);

    }
    auditor_subjective =[];
    auditor_single = [];
      if(formData.authorRes != null && formData.authorRes != undefined && formData.authorRes != "" ){
      var a  = "2_"+formData.authorRes;
      auditor_subjective.push(a);
      }else{auditor_subjective = [] }

      if(formData.btnOption != null && formData.btnOption != undefined && formData.btnOption != ""){
      var b  = "4_"+ formData.btnOption;
      auditor_single.push(b);
      }else{ auditor_single = []}
       var obj2 = {
      "authToken": "AUTH_TOKEN",
      "auditor_id": "109789",
      "question_refid": lastQuesRefid,
      "audit_in_exe_refid": idFromParam,
      "auditee_name": "Test Auditee",
      "auditee_multi": [],
      "auditee_single": [],
      "auditee_boolean": [],
      "auditee_attachement": [],
      "auditee_subjective": [],
      "auditor_multi": [],
      "auditor_single": auditor_single,
      "auditor_boolean": [],
      "auditor_attachement": [],
      "auditor_subjective": auditor_subjective
    }
    arrToSend.push(obj2);
    let body = arrToSend;
    console.log(body);
   

   
    axios.post(apiUrlForCapturingResponse,body).then(response => {
    if(true) {
      toast("Audit Response Data  saved Successfully");
      navigate('/audits');
      for(let i = 0;i<questionCount-1;i++){
        var key = "id"+idFromParam+'ques'+i;
        console.log(key);
        sessionStorage.removeItem(key); 
      }

    }
    else {
      toast("Error")
    }
    
    })
  }
    
  }
   function handleTempClick(){

   }
  return (
    <>
    <div className="mainBody">
      <form
        onSubmit={handleSubmit}
        className="container mt-2 mb-5 pb-3"
        style={{
          width: "70%",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          borderRadius: "5px",
        }}
      >
        <div
          className="text-center row"
          style={{ background: "#EE4145", color: "white" }}
        >
          <p style={{ fontSize: "20px", paddingTop: "10px" }}>
            {currentQuestion[index]?.audit_tags}
          </p>
        </div>
        <div className="container mx-4 " style={{ width: "90%" }}>
          <div
            className="container mt-2 mb-2"
            style={{
              width: "100%",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              borderRadius: "5px",
            }}
          >
            <div>
              <p style={{ color: "#EE4145" }}>Clause : {currentQuestion[index]?.main_clause_no}.{currentQuestion[index]?.clause_no}</p>
              <p style={{ color: "#EE4145", fontSize: "20px" }}>
                {currentQuestion[index]?.clause_title}
              </p>
              <p className="pb-4">{currentQuestion[index]?.question_text}</p>
            </div>
          </div>
          {/* notes */}

          {currentQuestion[index]?.auditor_options?.map((e, i) => {
            return (
              (e.response_type === "subjective" && (
                <div className="mb-2 " key={i}>
                  <div>
                    <p style={{ color: "#EE4145" }}>Auditor Responses *</p>
                    <p>Note: </p>
                  </div>
                  <textarea
                    placeholder="Enter the note..."
                    name="authorRes"
                    value={formData.authorRes}
                    onChange={(e) => {
                      setFormData({ ...formData, authorRes: e.target.value });
                    }}
                    style={{ width: "100%" }}
                  />
                  {errors.authorRes && <span className="error">{errors.authorRes}</span>}
                </div>
              )) ||
              (e.response_type === "attachement" && (
                <div className="mb-2 attachment">
                  <div className="d-flex justify-content-between">
                 
                    <p>Attachment:</p>
                    {/* <input type="file"/> */}
                    <label htmlFor="myInput">
                      <img
                        width="30"
                        height="30"
                        src="https://img.icons8.com/ios/50/apple-camera.png"
                        alt="apple-camera"
                      />
                    </label>
                    <input
                      id="myInput"
                      style={{ display: "none" }}
                      type={"file"}
                    />
                  </div>
                  <div
                    className="container mb-2 d-flex justify-content-evenly"
                    style={{
                      width: "100%",
                      height: "100px",
                      background: "#9994941c",
                      borderRadius: "5px",
                    }}
                  >
                    <h3  style={{color:"red"}}> Coming Soon...</h3>
                    {e.option1 && (
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "grey",
                        }}
                      >
                        <img
                          style={{
                            width: "100px",
                            height: "100px",
                            background: "grey",
                          }}
                          src={e.option1}
                          alt={e.option1}
                        />
                      </div>
                    )}
                    {e.option2 && (
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "grey",
                        }}
                      ></div>
                    )}{" "}
                    {e.option3 && (
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "grey",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              )) ||
              (e.response_type === "single" && (
                <div
                  className="row d-flex justify-content-center "
                  style={{ width: "100%" }}
                >
                  {e.option1 && (
                    <div className="mt-2 mb-2 text-center col-2">
                      <button
                        className="buttons"
                        name="btnOption"
                        value={formData.btnOption}
                        onClick={ (e) =>{handleBelowButtonClick(e)}}
                      >
                        {e.option1}
                      </button>
                    </div>
                  )}
                  {e.option2 && (
                    <div className="mt-2 mb-2 text-center col-2">
                      <button
                        className="buttons"
                        name="btnOption"
                        value={formData.btnOption}
                        onClick={ (e) =>{handleBelowButtonClick(e)}}
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   setFormData({
                        //     ...formData,
                        //     btnOption: e.target.innerHTML,
                        //   });
                        // }}
                      >
                        {e.option2}
                      </button>
                    </div>
                  )}{" "}
                  {e.option3 && (
                    <div className="mt-2 mb-2 text-center col-2">
                      <button
                        className="buttons"
                        name="btnOption"
                        value={formData.btnOption}
                        onClick={ (e) =>{handleBelowButtonClick(e)}}
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   setFormData({
                        //     ...formData,
                        //     btnOption: e.target.innerHTML,
                        //   });
                        // }}
                      >
                        {e.option3}
                      </button>
                    </div>
                  )}{" "}
                  {e.option4 && (
                    <div className="mt-2 mb-2 text-center col-2">
                      <button
                        className="buttons"
                        name="btnOption"
                        value={formData.btnOption}
                        onClick={ (e) =>{handleBelowButtonClick(e)}}
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   setFormData({
                        //     ...formData,
                        //     btnOption: e.target.innerHTML,
                        //   });
                        // }}
                      >
                        {e.option4}
                      </button>
                    </div>
                  )}{" "}
                  {e.option5 && (
                    <div className="mt-2 mb-2 text-center col-2">
                      <button
                        className="buttons"
                        name="btnOption"
                        value={formData.btnOption}
                        onClick={ (e) =>{handleBelowButtonClick(e)}}
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   setFormData({
                        //     ...formData,
                        //     btnOption: e.target.innerHTML,
                        //   });
                        // }}
                      >
                        {e.option5}
                      </button>
                    </div>
                  )}
                  {e.option6 && (
                    <div className="mt-2 mb-2 text-center col-2">
                      <button
                        className="buttons"
                        name="btnOption"
                        value={formData.btnOption}
                        onClick={ (e) =>{handleBelowButtonClick(e)}}
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   setFormData({
                        //     ...formData,
                        //     btnOption: e.target.innerHTML,
                        //   });
                        // }}
                      >
                        {e.option6}
                      </button>
                    </div>
                  )}
                    {errors.btnOption && <span className="error">{errors.btnOption}</span>}
                </div>
              ))
            );
          })}
          <div className="nextAndPreviousButton row">
            <div className="col-2"> 
            <button    className={index ==0 ? "d-none" : "previousButton "} onClick={handelPreviousClick}> Previous </button>
            </div>
            <div className="col-8"> 
            <ProgressBar bgcolor={"#FC001D"} completed={index+1} totalQuestions={questionCount}  />
          </div>
          <div className="col-2"> 
          <button  className={index<currentQuestion.length-1 ? "nextButton " : "d-none"}  onClick={(e)=>{ handelNextClick(e,currentQuestion[index]?.refid)}} type="submit"> Next </button>
        <button  className={index == currentQuestion.length-1 ? "submitButton " : "d-none"}  onClick={(e)=> { handleShow(e,currentQuestion[index]?.refid)}} type="submit"> Submit </button>
            </div>
          </div>
        
        </div>
      </form>
      <Modal show={show} onHide={handleClose} style={{ 'margin-top': "10%" }}>
        <Modal.Header closeButton>
          Save Audit Response 
        </Modal.Header>
        <Modal.Body>Do You  Want to save Audit Response </Modal.Body>
        <Modal.Footer>
          <Button  className="no-button"  onClick={handleClose}>
            No
          </Button>
          <Button className="yes-button" onClick={handleSubmitButton}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      
      <ToastContainer />
      

    </div>
    <ThreeCircles
         height="100"
        width="100"
        color="red"
        wrapperStyle={{}}
        wrapperClass="loader"
        visible={showLoader}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
/>
    </>
  );
}

export default Question2;
