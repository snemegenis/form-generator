import React, {PropTypes} from "react";
import Form from "react-jsonschema-form";

class DisabilityForm extends React.Component {
  constructor() {
    super();
  }

  render() {
    const schema = {
      type: "object",
      required: ["history"],
      properties: {
        patientId: {type: "string"},
        history: {type: "string", title: "Enter history"},
        treatment: {
          type: "array",
          title: "Select treatment",
          items:{
            enum: ["AMBULATORIC", "MEDICAMENTS", "STATIONARY", "SURGERY", "REABILITATION", "OTHER"],
            enumNames: ["AMBULATORIC", "MEDICAMENTS", "STATIONARY", "SURGERY", "REABILITATION", "OTHER"]
          },
          "uniqueItems": true
        }
      }
    };

    const uiSchema = {
      patientId: {
        "ui:widget": "hidden"
      },
      history: {
        "ui:widget": "textarea"
      },
      treatment: {
        "ui:widget": "checkboxes"
      }
    };


    return <Form schema={schema} uiSchema={uiSchema} formData={this.props.formData}
      onSubmit={this.props.onSave}>
      <button>Save</button>
    </Form>
  }
}

DisabilityForm.propTypes = {
  onSave: PropTypes.func.isRequired
};

export default DisabilityForm;