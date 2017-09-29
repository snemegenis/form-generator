import React, {PropTypes} from "react";

const PatientForm = ({doctorId, patient, onSave = f => f}) => {

  let _personalId;

  const save = event => {
    event.preventDefault();
    onSave({
      personalId: _personalId.value
    });
  };


  return <form className="patient-form" onSubmit={save}>
    <div className="contents">
      {patient.id ? <input type="hidden" value={patient.id}/> : ''}
      <label>
        <strong>Personal id:</strong>
        <input ref={input => _personalId = input} type="text" value={patient.personalId}/>
      </label>
    </div>
    <div className="actions">
      <button>Save</button>
    </div>
  </form>
};

PatientForm.propTypes = {
  patient: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired
};

export default PatientForm;

