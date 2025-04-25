import * as React from 'react';
import { Collapse, List, ListItem, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { MRT_ColumnDef, MRT_ColumnFiltersState } from 'material-react-table';

export interface FilterPanelProps<TData extends Record<string, any>> {
  columns: MRT_ColumnDef<TData>[];
  onFilter: (filters: MRT_ColumnFiltersState) => void;
  open: boolean;
  initialFilters?: MRT_ColumnFiltersState;
}

export const FilterPanel = <TData extends Record<string, any>>({
  columns,
  onFilter,
  open,
  initialFilters = [],
}: FilterPanelProps<TData>) => {
  const [filters, setFilters] = React.useState<MRT_ColumnFiltersState>(initialFilters);

  const handleFilterChange = (columnId: string, value: any) => {
    const newFilters = filters.filter(f => f.id !== columnId);
    if (value !== '') {
      newFilters.push({ id: columnId, value });
    }
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <Collapse in={open}>
      <List>
        {columns.map((column) => (
          <ListItem key={column.id}>
            <FormControl fullWidth size="small">
              <InputLabel>{column.header}</InputLabel>
              <TextField
                label={column.header}
                value={filters.find(f => f.id === column.id)?.value ?? ''}
                onChange={(e) => handleFilterChange(column.id as string, e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormControl>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}; 