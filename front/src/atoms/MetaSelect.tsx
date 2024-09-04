import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  menuItems: {value: number, name: string}[];
  defaultValue: number;
  onChange: (event: SelectChangeEvent) => void;
}

export const MetaSelect: React.FC<Props> = ({menuItems, defaultValue, onChange}) => {
  return (
      <FormControl fullWidth>
        <Select sx={{backgroundColor: "#ffff", borderRadius: "10px"}}
          defaultValue={defaultValue.toString()}
          onChange={onChange}
        >
          {menuItems.map((menuItem) => {
            return (
              <MenuItem key={menuItem.value} value={menuItem.value}>{menuItem.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
  );
}
