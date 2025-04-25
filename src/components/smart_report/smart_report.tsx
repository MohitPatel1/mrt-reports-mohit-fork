import { MaterialReactTableProps, MRT_RowData, MRT_VisibilityState, MRT_ColumnFiltersState, MRT_SortingState, MRT_GroupingState, MRT_PaginationState, MRT_ColumnDef, useMaterialReactTable, MRT_TableInstance } from "material-react-table";
import { SmartMRT } from "../smart_mrt";
import { SmartTableSettings } from "../smart_table_settings";
import { SmartTableSettings as SmartTableSettingsType } from "../smart_table_settings/smart_table_settings";
import { Stack } from "@mui/material";
import { TableContextProvider } from "../../TableContextProvider";

type SmartReportProps<T extends MRT_RowData> = {
  tableProps: Omit<MaterialReactTableProps<T>, 'columns' | 'data'> & {
    columns: MRT_ColumnDef<T>[];
    data: T[];
  };
  tableSettings?: SmartTableSettingsType;
  table?: MRT_TableInstance<T>;
}

export const SmartReport = <T extends MRT_RowData>({
  tableProps, 
  tableSettings, 
  table
}: SmartReportProps<T>) => {
  
  return (
    <TableContextProvider tableProps={tableProps} table={table}>
      <Stack direction="row" spacing={1}>
        <SmartTableSettings
          tableSettings={{
            position: 'left-drawer',
            ...tableSettings
          }}
        />
        <SmartMRT />
      </Stack>
    </TableContextProvider>
  );
}; 