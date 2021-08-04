import React from 'react';
import { Switch as MuiSwitch, FormControlLabel } from '@material-ui/core';

const Switch = (props) => {
  const { checked, disabled, inputProps, label, name, onChange, value } = props;

  return (
    <FormControlLabel
      key={name}
      name={name}
      label={label}
      value={value}
      disabled={disabled}
      control={
        <MuiSwitch
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          inputProps={inputProps}
          color="primary"
        />
      }
    />
  );
};

export default Switch;
