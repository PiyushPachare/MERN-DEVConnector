import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null && //alert should not be null
  alerts.length > 0 && //alert length should be greater than 0  //setting up alert with id,class(css) & msg
  alerts.map((alert) => (
    <div key={alerts.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
}); //mapping redux state to this props

export default connect(mapStateToProps)(Alert);
