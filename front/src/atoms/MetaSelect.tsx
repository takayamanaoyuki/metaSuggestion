import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  menuItems: {value: number, name: string}[];
  defaultValue: number;
}

export const MetaSelect: React.FC<Props> = ({menuItems, defaultValue}) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
      <FormControl fullWidth>
        <Select sx={{backgroundColor: "#ffff", borderRadius: "10px"}}
          defaultValue={defaultValue}
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
