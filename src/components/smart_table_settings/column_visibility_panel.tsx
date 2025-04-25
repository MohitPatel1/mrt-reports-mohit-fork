import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Collapse } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

interface ColumnVisibilityPanelProps<TData extends Record<string, any>> {
  columns: MRT_ColumnDef<TData>[];
  onColumnVisibilityChange: (columnVisibility: Record<string, boolean>) => void;
  open: boolean;
}

export const ColumnVisibilityPanel = <TData extends Record<string, any>>({
  columns,
  onColumnVisibilityChange,
  open,
}: ColumnVisibilityPanelProps<TData>) => {
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>(
    columns.reduce((acc, column) => {
      if (column.accessorKey) {
        acc[column.accessorKey as string] = true;
      }
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleToggleAll = () => {
    const allVisible = Object.values(columnVisibility).every(Boolean);
    const newVisibility = Object.keys(columnVisibility).reduce(
      (acc, key) => ({ ...acc, [key]: !allVisible }),
      {}
    );
    setColumnVisibility(newVisibility);
    onColumnVisibilityChange(newVisibility);
  };

  const handleToggleColumn = (columnKey: string) => {
    const newVisibility = {
      ...columnVisibility,
      [columnKey]: !columnVisibility[columnKey],
    };
    setColumnVisibility(newVisibility);
    onColumnVisibilityChange(newVisibility);
  };

  return (
    <Collapse in={open}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Button
            onClick={handleToggleAll}
            variant="outlined"
            size="small"
          >
            {Object.values(columnVisibility).every(Boolean)
              ? 'Hide All'
              : 'Show All'}
          </Button>
        </Box>

        {columns.map((column) => {
          const columnKey = column.accessorKey as string;
          if (!columnKey) return null;

          return (
            <FormControlLabel
              key={columnKey}
              control={
                <Checkbox
                  checked={columnVisibility[columnKey]}
                  onChange={() => handleToggleColumn(columnKey)}
                  size="small"
                />
              }
              label={column.header as string}
            />
          );
        })}
      </Box>
    </Collapse>
  );
};