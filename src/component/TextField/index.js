import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const TextField = ({
  label,
  value,
  InputProps,
  type,
  error,
  helperText,
  ...props
}) => {
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);

  const handleClickShowPassword = () =>
    setPasswordVisibility(!passwordVisibility);

  const stateType =
    passwordVisibility && type === 'password' ? 'text' : 'password';

  const startAdornment =
    type === 'currency' ? (
      <InputAdornment position="start">$</InputAdornment>
    ) : (
      InputProps && InputProps.startAdornment
    );

  const endAdornment =
    type === 'password' ? (
      <InputAdornment position="end">
        <IconButton
          edge="end"
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={(event) => event.preventDefault()}
        >
          {passwordVisibility ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ) : (
      InputProps && InputProps.endAdornment
    );

  return (
    <MaterialTextField
      // Default props
      fullWidth
      variant="outlined"
      margin="normal"
      // Key props
      label={label}
      value={value}
      helperText={helperText}
      // Meta props
      error={error}
      // Other props
      InputProps={{
        ...InputProps,
        type: type === 'password' ? stateType : type,
        startAdornment,
        endAdornment,
      }}
      FormHelperTextProps={{
        error,
      }}
      {...props}
    />
  );
};

export default TextField;
