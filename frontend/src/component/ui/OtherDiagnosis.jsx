import React, {PropTypes} from "react";
import {Button, ButtonToolbar, Clearfix, Glyphicon} from "react-bootstrap";
import Diagnosis from "./Diagnosis.jsx";
import {maskedInvalid} from "../../util/ValidationUtil";

const otherDiagnosisCodeIsValid = (selector, index) =>
  selector && selector.length > index && !maskedInvalid(selector[index].code);

const OtherDiagnosis = ({onRemoveDiagnosis, selector, t, fields, meta}) => (
  <div className="other-diagnosis">
    {fields.map((diagnosis, index) =>
      <div key={index}>
        <div className="section-header">
          <span className="section-header-text">{t('Other diagnosis {{code}}',
            {
              'code': otherDiagnosisCodeIsValid(selector, index) ? selector[index].code : ('#'.concat(index + 1))
            })}</span>
          <Button className="float-right"
                  onClick={() => onRemoveDiagnosis(() => fields.remove(index))}>
            <Glyphicon glyph="remove"/>
          </Button>
          <Clearfix/>
        </div>
        <div>
          <Diagnosis t={t} name={`${diagnosis}`} withDetails={true}/>
        </div>
      </div>
    )}
    {meta.error ? meta.error : ""}
    <ButtonToolbar>
      <Button onClick={() => fields.push({})}>{t("Add Diagnosis")}</Button>
    </ButtonToolbar>
  </div>
);

OtherDiagnosis.propTypes = {
  onRemoveDiagnosis: PropTypes.func.isRequired,
  selector: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  fields: PropTypes.object,
  meta: PropTypes.object
};

export default OtherDiagnosis;