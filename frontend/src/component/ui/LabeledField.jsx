import React, {PropTypes} from "react";

const LabeledField = ({id, label, children, input, meta}) => {
  const childrenWithProps = React.Children.map(children,
    (child) => React.cloneElement(child, {
      input, meta
    })
  );
  return <div className="form-group">
    <label htmlFor={id}>{label}</label>
    {childrenWithProps}
    {meta.error ? meta.error: ''}
  </div>
};

LabeledField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default LabeledField;
