import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import 'react-toastify/dist/ReactToastify.css';
import MainFormContent from './components/MainFormContent';
import Header from './components/Header';
import Footer from './components/Footer';
import ButtonList from './components/ButtonList';

require('es6-promise').polyfill();

export default class ReactMailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      formConfiguration: null,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    /* start axios request to load configuration */
    const { formConfigurationURL } = this.props;
    axios.get(formConfigurationURL)
      .then((response) => {
        // get all fields and add their default data
        const content = {};
        Object.keys(response.data.content).map((c) => {
          if (typeof (response.data.content[c].default) !== 'undefined') {
            content[c] = response.data.content[c].default;
          } else {
            // ToDo: check type and update accordingly
            switch (response.data.content[c].type) {
              case 'text':
                content[c] = '';
                break;
              case 'textarea':
                content[c] = '';
                break;
              case 'checkbox_array':
                // check if it exists and delete otherwise add
                content[c] = [];
                break;
              case 'select':
                content[c] = '';
                break;
              default:
                break;
            }
          }
          return null;
        });
        this.setState(() => ({ content }));
        this.setState(() => ({
          dataLoaded: true,
          formConfiguration: response.data,
        }));
      })
      .catch(() => {
        // console.log("ERROR", error)
      });
  }

  changeHandler(i, type, e) {
    this.setState((previousState) => {
      const newState = { ...previousState };
      const idx = newState.content[i].indexOf(e);
      switch (type) {
        case 'text':
          newState.content[i] = e;
          break;
        case 'textarea':
          newState.content[i] = e;
          break;
        case 'select':
          newState.content[i] = e;
          break;
        case 'checkbox_array':
          // check if it exists and delete otherwise add
          if (idx > -1) {
            newState.content[i].splice(idx, 1);
          } else {
            newState.content[i].push(e);
          }
          break;
        default:
          break;
      }
      return newState;
    });
  }

  submitHandler(e) {
    /* start axios request to submit form data */
    e.preventDefault();
    e.stopPropagation();
    const { formConfiguration, content } = this.state;
    const {
      formID, endpoint, successMessage, errorMessage,
    } = formConfiguration;
    // perform some basic validation
    if (document.getElementById(formID).reportValidity()) {
      axios.post(
        endpoint,
        content,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then(() => {
          toast(successMessage, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000,
            bodyClassName: css({
              fontSize: '2.0rem !important',
            }),
            progressClassName: css({
              background: 'green !important',
            }),
          });
        })
        .catch(() => {
          toast(errorMessage, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000,
            bodyClassName: css({
              fontSize: '2.0rem !important',
            }),
            progressClassName: css({
              background: 'red !important',
            }),
          });
        });
    } else {
      document.querySelectorAll(`#${formID} :invalid`)
        .forEach((node) => {
          node.classList.add('invalidInputElement');
        });
      window.setTimeout(() => {
        document.querySelectorAll(`#${formID} :invalid`)
          .forEach((node) => {
            node.classList.remove('invalidInputElement');
          });
      }, 1000);
    }
  }

  render() {
    const { dataLoaded } = this.state;
    if (dataLoaded) {
      const {
        content,
        formConfiguration,
      } = this.state;
      const { formID } = formConfiguration;
      const { formTitle, footerText, content: formContent } = formConfiguration;
      return (
        <div>
          <ToastContainer />
          <Header formTitle={formTitle} />
          <MainFormContent
            content={formContent}
            formState={content}
            formID={formID}
            changeHandler={this.changeHandler}
          />
          <ButtonList submitHandler={this.submitHandler} />
          <Footer footerText={footerText} />
        </div>
      );
    }
    return <div>loading</div>;
  }
}

ReactMailForm.propTypes = {
  formConfigurationURL: PropTypes.string,
};

ReactMailForm.defaultProps = {
  formConfigurationURL: null,
};
