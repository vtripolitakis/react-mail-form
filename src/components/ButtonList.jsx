import React from 'react';
import PropTypes from 'prop-types';

const ButtonList = ({ submitHandler }) => (
  <div>
    <button type="button" className="btn btn-default" onClick={submitHandler}>Submit</button>
    {' '}
    <button type="button" className="btn btn-cancel">Cancel</button>
  </div>
);

ButtonList.defaultProps = {
  submitHandler: () => {},
};

ButtonList.propTypes = {
  submitHandler: PropTypes.func,
};

export default ButtonList;
