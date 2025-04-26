import React, { createContext, useContext } from "react";
import { MRT_ColumnDef, MRT_RowData, MRT_TableInstance, useMaterialReactTable } from "material-react-table";
import { MaterialReactTableProps } from "material-react-table";

// Create context with a type that can be cast to any table instance
export const SmartMRTContext = createContext<any>(null);

export const useTableContext = <T extends MRT_RowData>(): MRT_TableInstance<T> => {
    const context = useContext(SmartMRTContext);
    if (!context) {
        throw new Error('useTableContext must be used within a TableContextProvider');
    }
    return context as MRT_TableInstance<T>;
}

export const TableContextProvider = <T extends MRT_RowData>({
    children, 
    tableProps, 
    table
}: {
    children: React.ReactNode, 
    tableProps: Omit<MaterialReactTableProps<T>, 'columns' | 'data'> & {
        columns: MRT_ColumnDef<T>[];
        data: T[];
    },
    table?: MRT_TableInstance<T>
}) => {
    const { columns, data, ...tablePropsWithoutColumnsAndData } = tableProps;
    const tableInstance = table || useMaterialReactTable<T>({
        columns,
        data,
        globalFilterModeOptions: ['fuzzy', 'startsWith'],
        ...tablePropsWithoutColumnsAndData
    });
    
    return (
        <SmartMRTContext.Provider value={{...tableInstance}}>
            {children}
        </SmartMRTContext.Provider>
    );
}
