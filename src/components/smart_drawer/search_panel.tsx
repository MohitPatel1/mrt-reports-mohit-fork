import { useState } from 'react';
import { Collapse, TextField } from '@mui/material';

export interface SearchPanelProps {
  onSearch: (searchTerm: string) => void;
  open: boolean;
  initialValue?: string;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  onSearch,
  open,
  initialValue = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Collapse in={open}>
      <TextField
        fullWidth
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        size="small"
        sx={{ m: 2 }}
      />
    </Collapse>
  );
};