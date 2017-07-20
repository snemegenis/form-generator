import React, {PropTypes} from "react";
import PatientList from "../ui/PatientList.jsx";
import {printPatientAction} from "../../action/action";

const VisiblePatients = (props, {store}) => {
    const {patients} = store.getState();
    return <PatientList patients={patients.data} loading={patients.isLoading}
                        onPatientClick={
                            (id, firstName, lastName) => {
                                console.log('print patient');
                                store.dispatch(printPatientAction(id, firstName, lastName))
                                }
                            }/>;
};

VisiblePatients.contextTypes = {
    store: PropTypes.object
};

export default VisiblePatients;
