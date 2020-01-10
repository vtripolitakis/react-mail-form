import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ formTitle }) => (<div><h2>{formTitle}</h2></div>);

Header.defaultProps = {
  formTitle: '',
};

Header.propTypes = {
  formTitle: PropTypes.string,
};

export default Header;
