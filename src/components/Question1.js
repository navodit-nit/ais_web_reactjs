import React from 'react'

function Question1() {
  return (
    <div className='container mt-5 mb-5' style={{width:'70%',boxShadow:'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',borderRadius:'5px'}}>
    <div className='row text-center' style={{background:'#EE4145',color:'white'}}>
        <p style={{fontSize:'20px',fontWeight:'600',paddingTop:'10px'}}>Audit Info</p>
        </div>
        <div className='container mx-4'>
            <div className='row d-flex mb-4 mt-3'>
            <div className='col-3 '><h3>IMS-H-25</h3></div>
            <div className='col-3'><h3>HGFGJGHG</h3></div>
            </div>
            <hr/>
            <div className='row d-flex mb-4'>
            <div className='col-6 h5 text-secondary'><p>Auditor Name</p></div>
            <div className='col-6 h5'><p>asdfghjkll</p></div>
            </div>
            <div className='d-flex mb-4'>
            <div className='col-6 text-secondary h5'><p>Auditee Name</p></div>
            <div className='col-6 h5'><input style={{width:"70%"}}/>
            &nbsp;&nbsp;&nbsp;
            <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/menu--v3.png" alt="menu--v3 "/>
            </div>
            </div>
            <div className='d-flex mb-4'>
            <div className='col-6 text-secondary h5'><p>Auditee Image</p></div>
            <div className='col-6'>                <label for="file-input">
                <img width="30" height="30" src="https://img.icons8.com/ios/50/apple-camera.png" alt="apple-camera"/>                 </label>
             <input id="file-input" type="file" style={{display:'none'}} />
            </div>

            </div>
            <div className='d-flex mb-4'>
            <div className='col-6 text-secondary h5'><p>Doc No.</p></div>
            <div className='col-6 h5'><p>131242424</p></div>
            </div>
            <div className='text-center mb-4'>
                <button style={{width:'40%',background:'#EE4145',padding:'12px',border:'1px solid red',marginBottom:'20px',color:'white',borderRadius:'10px'}}>START</button>
            </div>

        </div>
    </div>
  )
}

export default Question1
