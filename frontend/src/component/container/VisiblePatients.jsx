import React, {PropTypes} from "react";
import PatientList from "../ui/PatientList.jsx";

const VisiblePatients = (props, {store}) => {
    const {patients} = store.getState();
    return <PatientList patients={patients.data} loading={patients.isLoading}
                        onPatientClick={()=> store.dispatch()}/>;
};

VisiblePatients.contextTypes = {
    store: PropTypes.object
};

export default VisiblePatients;
