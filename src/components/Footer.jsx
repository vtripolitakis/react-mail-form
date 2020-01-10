import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ footerText }) => (<div><p>{footerText}</p></div>);

Footer.defaultProps = {
  footerText: '',
};

Footer.propTypes = {
  footerText: PropTypes.string,
};

export default Footer;
