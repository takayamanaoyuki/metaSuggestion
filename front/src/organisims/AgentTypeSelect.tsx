import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MetaSelect } from '../atoms/MetaSelect';
import { SelectOption } from './FrontPageHeader';

type Props = {
  onAgentTypeChange: (event: SelectChangeEvent) => void;
  selectOptions: SelectOption[]
}

export const AgentTypeSelect: React.FC<Props> = ({onAgentTypeChange, selectOptions}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <MetaSelect menuItems={selectOptions}
      defaultValue={0}
      onChange={onAgentTypeChange}
      />
      
    </Box>
  );
}
