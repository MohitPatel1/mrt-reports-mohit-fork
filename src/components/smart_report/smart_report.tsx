import { MaterialReactTableProps, MRT_RowData, MRT_VisibilityState, MRT_ColumnFiltersState, MRT_SortingState, MRT_GroupingState, MRT_PaginationState, MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { SmartMRT } from "../smart_mrt";
import { SmartTableSettings } from "../smart_table_settings";
import { SmartTableSettingsProps } from "../smart_table_settings/smart_table_settings";
import { Box, Stack } from "@mui/material";

export interface TableState {
  searchTerm: string;
  filters: MRT_ColumnFiltersState;
  sortBy: MRT_SortingState;
  groupBy: MRT_GroupingState;
  columnVisibility: MRT_VisibilityState;
  pagination: MRT_PaginationState;
}

type SmartReportProps<T extends MRT_RowData> = {
  tableProps: Omit<MaterialReactTableProps<T>, 'columns' | 'data'> & {
    columns: MRT_ColumnDef<T>[];
    data: T[];
  };
  tableSettings: SmartTableSettingsProps<T>;
}

export const SmartReport = <T extends MRT_RowData>({tableProps, tableSettings}:SmartReportProps<T>) => {

  const tableInstance = useMaterialReactTable<T>({
    globalFilterModeOptions: ['fuzzy', 'startsWith'],
    ...tableProps
  });
  
  return <Stack direction="row" spacing={1}>
    <SmartTableSettings
      table={tableInstance}
      tableSettings={{
        position: 'left-drawer',
        ...tableSettings
      }}
    />
      <SmartMRT table={tableInstance} />
  </Stack>;
}; 