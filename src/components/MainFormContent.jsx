import React from 'react';
import PropTypes from 'prop-types';

const MainFormContent = ({
  content, formState, changeHandler, formID,
}) => {
  let formData = null;
  formData = Object.keys(content).map((i) => {
    const objectData = content[i];
    const isRequired = objectData.required;
    let outData = null;
    switch (objectData.type) {
      case 'checkbox_array': {
        const checkboxArrayData = objectData.options.map((j) => {
          let isChecked = false;
          if (formState[i].indexOf(j) > -1) {
            isChecked = true;
          }
          return (
            <div key={j} className="col-md-4">
              <input
                type="checkbox"
                name={`${i}[]`}
                value={j}
                defaultChecked={isChecked}
                onChange={(e) => {
                  changeHandler(i, 'checkbox_array', e.target.value);
                }}
              />
              {' '}
              {j}
            </div>
          );
        });
        outData = <div id={i}>{checkboxArrayData}</div>;
        break;
      }
      case 'select': {
        let currentOptionSelected = false;
        const selectData = objectData.options.map((j) => {
          if (typeof objectData.default !== 'undefined') {
            if (objectData.default === j) {
              currentOptionSelected = true;
            } else {
              currentOptionSelected = false;
            }
          }
          return <option key={j} selected={currentOptionSelected}>{j}</option>;
        });
        selectData.unshift(<option disabled selected={!currentOptionSelected} key="please select" value="">Please Select</option>);
        outData = (
          <div id={i}>
            <select
              required={isRequired}
              onChange={(e) => {
                changeHandler(i, 'select', e.target.value);
              }}
            >
              {selectData}
            </select>
          </div>
        );
        break;
      }
      case 'textarea':
        outData = (
          <div id={i}>
            <textarea
              rows={objectData.rows}
              cols={objectData.cols}
              defaultValue={formState[i]}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                changeHandler(i, 'textarea', e.target.value);
              }}
              required={isRequired}
            />
          </div>
        );
        break;
      case 'text':
        outData = (
          <div id={i}>
            <input
              type={objectData.type}
              width={objectData.maxwidth}
              defaultValue={formState[i]}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                changeHandler(i, 'text', e.target.value);
              }}
              required={isRequired}
            />
          </div>
        );
        break;
      default:
        break;
    }
    let label = '';
    if (typeof content[i].label === 'undefined') {
      label = i;
    } else {
      label = content[i].label;
    }
    return (
      <div key={i} className={`form-group col-md-${objectData.btcolumns}`}>
        <label htmlFor={i}>
          {label}
          {' '}
          {(isRequired) ? '*' : ''}
        </label>
        {outData}
      </div>
    );
  });
  return (
    <div>
      <form id={formID}>
        {formData}
      </form>
    </div>
  );
};

MainFormContent.defaultProps = {
  content: [],
  formState: {},
  changeHandler: () => {},
  formID: null,
};

MainFormContent.propTypes = {
  content: PropTypes.objectOf(PropTypes.object),
  formState: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
  ),
  changeHandler: PropTypes.func,
  formID: PropTypes.string,
};


export default MainFormContent;
