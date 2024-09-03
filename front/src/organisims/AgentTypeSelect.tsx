import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MetaSelect } from '../atoms/MetaSelect';

export default function AgentTypeSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <MetaSelect menuItems={[
        {value: 0, name: "記憶なし"},
        {value: 1, name: "短期記憶あり"}
      ]}
      defaultValue={0}
      />
      
    </Box>
  );
}
