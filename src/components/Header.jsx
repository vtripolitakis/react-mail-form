import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ formTitle }) => (<div><h1>{formTitle}</h1></div>);

Header.defaultProps = {
  formTitle: '',
};

Header.propTypes = {
  formTitle: PropTypes.string,
};

export default Header;
