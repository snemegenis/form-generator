import React from "react";
import {translate} from "react-i18next";

const Spinner = ({t = f=>f}) => {
  return <div>
    <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
    <h4>{t("Data is loading...")}</h4>
  </div>;
};

Spinner.propTypes = {
  t: React.PropTypes.func
};

export default translate()(Spinner);