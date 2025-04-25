import TableViewIcon from '@mui/icons-material/TableView';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Button } from "@mui/material";
import { MaterialReactTable, MaterialReactTableProps, MRT_RowData } from "material-react-table";
import { useState } from "react";
import "./smart_mrt.css";
import { FaFilePdf } from 'react-icons/fa';

/*
  TODO: (Responsive Card View)
  - Add a field `showInCardView` to the column definition. Default to false.
  - Show columns that have `showInCardView` set to true in card view.
  - When user toggles visibility of a column in card view, update the `showInCardView` field.
*/
export const SmartMRT = <T extends MRT_RowData>(props: MaterialReactTableProps<T>) => {
  console.log({props})
  // State to control the view mode override. Default to table view on desktop & card view on mobile.
  const [forceTableView, setForceTableView] = useState(window.innerWidth >= 500);
  return (
    <MaterialReactTable
      // Add props to the main table element (<table>)
      muiTableProps = {{
        // Conditionally add the 'force-table-view' class
        className: `responsive-card-table ${forceTableView ? 'force-table-view' : ''}`,
        sx: {
          maxWidth: forceTableView ? '100%' : '500px',            
        }
      }}
      // Add props to the table body cells (<td>)
      // @ts-expect-error FIXME: Redeclare / Redfine / Extend `TableCellProps` to add `data-label` prop.
      muiTableBodyCellProps = {({ cell }) => ({
        'data-label': cell.column.columnDef.header,
      })}
      renderTopToolbar = {() => (
        <div className="top-toolbar">
          <Button
            onClick={() => setForceTableView(!forceTableView)}
            startIcon={forceTableView ? <ViewModuleIcon /> : <TableViewIcon />}
          >
            {forceTableView ? 'Card View' : 'Table View'}
          </Button>
          <Button variant="outlined" style={{ height:'100%'}} startIcon={<FaFilePdf />}>
							View PDF
						</Button>
        </div>
      )}
      
      {...props}
    />
  );
};