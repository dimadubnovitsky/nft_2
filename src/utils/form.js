import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../component/TextField';
import Switch from '../component/Switch';

// Validators
export const required = (value) => {
  if ((!value && value !== 0) || (Array.isArray(value) && value.length === 0)) {
    return 'Required';
  }
  return undefined;
};

// Utils
export const composeValidators =
  (...validators) =>
  (value, formValues, meta) =>
    validators.reduce(
      (error, validator) => error || validator(value, formValues, meta),
      undefined,
    );

const Error = ({ error }) => (
  <span>
    {error}
    <br />
  </span>
);

Error.propTypes = {
  error: PropTypes.string,
};

export const getHelperText = (
  touched,
  error,
  submitError,
  dirtySinceLastSubmit,
  helperText,
) => {
  if (touched && error) {
    return Array.isArray(error)
      ? error.map((errorItem) => <Error error={errorItem} key={errorItem} />)
      : error;
  }
  if (submitError && !dirtySinceLastSubmit) {
    return Array.isArray(submitError)
      ? submitError.map((errorItem) => (
          <Error error={errorItem} key={errorItem} />
        ))
      : submitError;
  }
  if (helperText) {
    return Array.isArray(helperText)
      ? helperText.map((textItem) => <Error error={textItem} key={textItem} />)
      : helperText;
  }
  return undefined;
};

// Form Field renderers
export const renderTextField = ({
  label,
  input: { value, ...input },
  meta: { submitting, error, submitError, touched, dirtySinceLastSubmit },
  helperText,
  InputProps,
  disabled,
  loading,
  skeletonHeight,
  skeletonWidth,
  ...props
}) => (
  <TextField
    // Default props
    // Key props
    label={label}
    value={value}
    helperText={getHelperText(
      touched,
      error,
      submitError,
      dirtySinceLastSubmit,
    )}
    // Meta props
    error={Boolean(
      (touched && error) || (!dirtySinceLastSubmit && submitError),
    )}
    disabled={disabled || submitting}
    // Other props
    InputProps={InputProps}
    {...input}
    {...props}
  />
);

export const renderSwitch = ({
  label,
  input: { value, checked, onChange, name, ...inputProps },
  meta: { submitting, error, submitError, touched, dirtySinceLastSubmit },
  helperText,
  disabled,
  loading,
  ...props
}) => (
  <Switch
    // Default props
    // Key props
    name={name}
    label={label}
    value={value}
    checked={checked}
    onChange={onChange}
    helperText={getHelperText(
      touched,
      error,
      submitError,
      dirtySinceLastSubmit,
    )}
    // Meta props
    error={Boolean(
      (touched && error) || (!dirtySinceLastSubmit && submitError),
    )}
    disabled={disabled || submitting}
    // Other props
    inputProps={inputProps}
    {...props}
  />
);
