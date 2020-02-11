import React from "react";
import PropTypes from "prop-types";
import { LoadingWrapper } from "./style";
function Loading(props) {
  const loadingStyle =
    props && props.show ? { display: "" } : { display: "none" };
  return (
    <LoadingWrapper style={loadingStyle}>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
}
Loading.propTypes = {
  show: PropTypes.bool
};
Loading.defaultProps = {
  show: true
};
export default React.memo(Loading);
