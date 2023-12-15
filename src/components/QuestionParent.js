import React, { useState, useEffect } from 'react';
import axios from "axios";
import Question2 from './Question2';
import '../assets/style.css'
import ProgressBar from "./progressBar.js";



function QuestionParent() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [question, setQuestion] = useState([])
    const [completed, setCompleted] = useState(0);


    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const response = await axios('/question_list.json');
        setQuestion(response.data.data);
    }
    

    useEffect(() => {
    }, [question])

 
    return (
        <>
            
            <Question2 question={question[currentQuestion]} />

            <div class="container mb-5 d-flex justify-content-center"  style={{width: "70%",marginTop:'-2%'}}>
            {currentQuestion === 0 ? null :
                <button className='button-prev'
                    onClick={() =>
                        setCurrentQuestion(currentQuestion > 0 ? currentQuestion - 1 : 0)   
                    }
                >
                    Prev
                </button>
            }
            &nbsp;	&nbsp;	&nbsp;	&nbsp;		
            {currentQuestion === question.length - 1 ?
                <button className='button-next'>Submit</button>
                :
                <button className='button-next' onClick={() => setCurrentQuestion(currentQuestion < question.length - 1 ? currentQuestion + 1 : currentQuestion)}>
                    Next
                </button>
            }
      <ProgressBar bgcolor={"#6a1b9a"} completed={currentQuestion*10} />
            </div>
            </>
    )
}

export default QuestionParent