import React, {PropTypes} from "react";
import Form from "react-jsonschema-form";

class DisabilityForm extends React.Component {
  constructor(props) {
    super(props);

    const schema = {
      type: "object",
      required: [],
      properties: {
        patientId: {type: "string"},
        history: {type: "string", title: "Enter history"},
        treatment: {
          type: "array",
          title: "Select treatment",
          items:{
            enum: ["AMBULATORIC", "MEDICAMENTS", "STATIONARY", "SURGERY", "REABILITATION", "OTHER"],
            enumNames: ["Ambulatoric", "Medicaments", "Stationary", "Surgery", "Reabilitation", "Other"]
          },
          "uniqueItems": true
        },
        treatmentHistory: {type: "string", title: "Enter treatment history"}
      }
    };

    const uiSchema = {
      "ui:order": ["patientId", "history", "treatment", "treatmentHistory"],
      patientId: {
        "ui:widget": "hidden"
      },
      history: {
        "ui:widget": "textarea"
      },
      treatment: {
        "ui:widget": "checkboxes"
      },
      treatmentHistory: {
        "ui:widget": "textarea"
      }
    };

    const {formData} = this.props;
    this.state = {
      schema,
      uiSchema,
      formData
    }
  }

  handleChange(data) {
    const {formData} = data;
    let schema = {...this.state.schema};
    let uiSchema = {...this.state.uiSchema};
    if (formData.treatment && formData.treatment.includes('OTHER')) {
      schema.properties = Object.assign({}, schema.properties, {
        otherTreatment: {
          title: "Other treatment",
          type: "string"
        }
      });
      uiSchema = Object.assign({}, uiSchema, {
        otherTreatment: {
          "ui:widget": "textarea"
        }
      });
      uiSchema["ui:order"].splice(uiSchema["ui:order"].indexOf("treatmentHistory"), 0, "otherTreatment");
    } else {
      schema.properties = Object.assign({}, schema.properties);
      delete uiSchema.otherTreatment;
      delete formData.otherTreatment;
      delete schema.properties.otherTreatment;
      let otherTreatmentIndex = uiSchema["ui:order"].indexOf("otherTreatment");
      if (otherTreatmentIndex > -1) {
        uiSchema["ui:order"].splice(uiSchema["ui:order"].indexOf("otherTreatment"), 1);
      }
    }
    this.setState({schema, uiSchema, formData});
  }

  render() {

    return <Form schema={this.state.schema} uiSchema={this.state.uiSchema} formData={this.state.formData}
      onSubmit={this.props.onSave} onChange={this.handleChange.bind(this)}>
      <button>Save</button>
    </Form>
  }
}

DisabilityForm.propTypes = {
  onSave: PropTypes.func.isRequired
};

export default DisabilityForm;