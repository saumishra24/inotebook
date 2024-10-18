import React, { useEffect, useState } from 'react'

const Alert = (props) => {
  const [alert, setAlert] = useState(false);
  const {type, message} = props.alert;  
  useEffect( ()=>{
    setAlert(true);
    const timer = setTimeout(() => {
      setAlert(false);
    }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  },[props])

  return (
    <div className='Alert' style={{position:'fixed', top:'56px', width:"100%"}}>
    <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
  <symbol id="success" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="danger" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

    {alert &&
    <div className={`alert alert-${type} d-flex align-items-center alert-dismissible fade show`} role="alert">
    <svg className="bi flex-shrink-0 me-2" style={{ width: '20px', height: '20px' }} role="img" aria-label="Success:"><use  xlinkHref={`#${type}`}/></svg>
    <div>{message}
    </div>
  </div>
    }
    </div>
  )
}

export default Alert