import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed,totalQuestions } = props;
  var width = (completed*100)/totalQuestions;
  console.log(width);
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
        <span style={labelStyles}>{`${completed} / ${totalQuestions}`}</span>
      </div>
    </div>
    </>
  );
};

export default ProgressBar;