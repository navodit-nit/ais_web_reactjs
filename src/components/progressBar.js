import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed,totalQuestions } = props;
  var width = (completed*100)/totalQuestions;
  var percentage = Math.ceil(width);
  const containerStyles = {
    height: 20,
    width: '76%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${width}%`, 
    backgroundColor: bgcolor,
    transition: 'width 1s ease-in-out',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',

  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  }

  return (
    <> 
     
    <div style={containerStyles}>
      
      <div style={fillerStyles}>
        {/* <span style={labelStyles}>{`${completed} / ${totalQuestions}`} */}
        <span style={labelStyles}>{`${percentage}%`}
        </span>
      </div>
      <span style={{color:"red"}} > {completed} Completed Out Of {totalQuestions} </span>
    </div>
   
    </>
  );
};

export default ProgressBar;