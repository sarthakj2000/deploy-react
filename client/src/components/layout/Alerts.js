import React,{useContext} from 'react'
import AlertContext from '../../context/alert/alertContext';
const Alerts = () => {
    const alertContext=useContext(AlertContext);
    const {alert}=alertContext;
    

    return (
        alert.length>0 && alert.map(currAlert=>(
            <div key={currAlert.id} className={`alert alert-${currAlert.type}`}>
                <i className="fas fa-info-circle"></i> {currAlert.msg}
            </div>
        ))
    
    )
}

export default Alerts
