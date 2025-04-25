import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';

interface SearchPanelProps {
  onSearch: (searchTerm: string) => void;
  open: boolean;
  initialValue?: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const SearchPanel: React.FC<SearchPanelProps> = ({ onSearch, open, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = React.useState(initialValue);

  React.useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    onSearch(newValue);
  };

  return (
    <Collapse in={open}>
      <StyledBox>
        <TextField
          fullWidth
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
        />
      </StyledBox>
    </Collapse>
  );
}; 