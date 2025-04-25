import * as React from 'react';
import { Collapse, List, ListItem, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MRT_ColumnDef, MRT_SortingState } from 'material-react-table';

export interface SortPanelProps<TData extends Record<string, any>> {
  columns: MRT_ColumnDef<TData>[];
  onSort: (sortBy: MRT_SortingState) => void;
  open: boolean;
  initialSortBy?: MRT_SortingState;
}

export const SortPanel = <TData extends Record<string, any>>({
  columns,
  onSort,
  open,
  initialSortBy = [],
}: SortPanelProps<TData>) => {
  const [sortBy, setSortBy] = React.useState<MRT_SortingState>(initialSortBy);

  const handleSortChange = (columnId: string, desc: boolean) => {
    const newSortBy = [{ id: columnId, desc }];
    setSortBy(newSortBy);
    onSort(newSortBy);
  };

  return (
    <Collapse in={open}>
      <List>
        {columns.map((column) => (
          <ListItem key={column.id}>
            <FormControl fullWidth size="small">
              <InputLabel>{column.header}</InputLabel>
              <Select
                value={sortBy.find(s => s.id === column.id)?.desc ? 'desc' : 'asc'}
                label={column.header}
                onChange={(e) => handleSortChange(column.id as string, e.target.value === 'desc')}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}; 