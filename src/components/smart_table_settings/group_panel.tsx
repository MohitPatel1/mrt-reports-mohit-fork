import * as React from 'react';
import { Collapse, List, ListItem, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MRT_ColumnDef, MRT_GroupingState } from 'material-react-table';

export interface GroupPanelProps<TData extends Record<string, any>> {
  columns: MRT_ColumnDef<TData>[];
  onGroup: (groupBy: MRT_GroupingState) => void;
  open: boolean;
  initialGroupBy?: MRT_GroupingState;
}

export const GroupPanel = <TData extends Record<string, any>>({
  columns,
  onGroup,
  open,
  initialGroupBy = [],
}: GroupPanelProps<TData>) => {
  const [groupBy, setGroupBy] = React.useState<MRT_GroupingState>(initialGroupBy);

  const handleGroupChange = (columnId: string, selected: boolean) => {
    const newGroupBy = selected 
      ? [...groupBy, columnId]
      : groupBy.filter(id => id !== columnId);
    setGroupBy(newGroupBy);
    onGroup(newGroupBy);
  };

  return (
    <Collapse in={open}>
      <List>
        {columns.map((column) => (
          <ListItem key={column.id}>
            <FormControl fullWidth size="small">
              <InputLabel>{column.header}</InputLabel>
              <Select
                value={groupBy.includes(column.id as string)}
                label={column.header}
                onChange={(e) => handleGroupChange(column.id as string, e.target.value === 'true')}
              >
                <MenuItem value="false">Not Grouped</MenuItem>
                <MenuItem value="true">Grouped</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}; 