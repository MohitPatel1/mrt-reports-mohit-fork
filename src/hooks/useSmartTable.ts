import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MRT_TableInstance,
  MRT_RowData,
  MRT_TableState,
  MRT_ColumnDef,
  MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { SmartTableProps, SmartTableColumn, TableState } from '@/types/table';
import { useLocalStorageSync } from '@/hooks/useLocalStorageSync';
import { useBackendSync } from '@/hooks/useBackendSync';
import { usePDFExport } from '@/hooks/usePDFExport';

interface SmartTableHookReturn<TData extends MRT_RowData> {
  tableState: TableState<TData>;
  tableInstance: MRT_TableInstance<TData>;
  handleStateChange: (newState: TableState<TData>) => void;
  handleExportPDF: () => void;
  handleSyncState: () => void;
}

export function useSmartTable<TData extends MRT_RowData>({
  data = [],
  columns = [],
  enableStatePersistence = false,
  stateStorageKey = 'smart-table-state',
  enablePDFExport = false,
  pdfExportOptions,
  enableBackendSync = false,
  backendSyncOptions,
  enableDebugMode = false,
  ...tableProps
}: Omit<MRT_TableOptions<TData>, 'columns'> & 
   Pick<
     SmartTableProps<TData>,
     | 'columns'
     | 'enableStatePersistence'
     | 'stateStorageKey'
     | 'enablePDFExport'
     | 'pdfExportOptions'
     | 'enableBackendSync'
     | 'backendSyncOptions'
     | 'enableDebugMode'
   >): SmartTableHookReturn<TData> {
  const [tableState, setTableState] = useState<TableState<TData>>({
    sorting: [],
    columnFilters: [],
    globalFilter: '',
    globalFilterFn: 'fuzzy',
    columnVisibility: {},
    grouping: [],
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    columnFilterFns: {},
    density: 'comfortable',
    expanded: {},
    columnOrder: [],
    columnPinning: { left: [], right: [] },
    rowSelection: {},
    draggingColumn: null,
    draggingRow: null,
    editingCell: null,
    editingRow: null,
    hoveredColumn: null,
    hoveredRow: null,
    isFullScreen: false,
    showAlertBanner: false,
    showColumnFilters: false,
    showGlobalFilter: false,
    showToolbarDropZone: false,
    creatingRow: null,
    isLoading: false,
    isSaving: false,
    showLoadingOverlay: false,
    showProgressBars: false,
    showSkeletons: false,
    actionCell: null,
    rowPinning: { top: [], bottom: [] },
    columnSizing: {},
    columnSizingInfo: {
      columnSizingStart: [],
      deltaOffset: 0,
      deltaPercentage: 0,
      isResizingColumn: false,
      startOffset: 0,
      startSize: 0,
    },
  });

  // Make sure columns is an array
  const safeColumns = useMemo(() => columns || [], [columns]);

  const tableOptions: MRT_TableOptions<TData> = useMemo(() => ({
    data,
    columns: safeColumns as MRT_ColumnDef<TData>[],
    state: tableState as unknown as MRT_TableState<TData>,
    onStateChange: (updater: MRT_TableState<TData> | ((prev: MRT_TableState<TData>) => MRT_TableState<TData>)) => {
      if (typeof updater === 'function') {
        setTableState(prev => updater(prev as unknown as MRT_TableState<TData>) as unknown as TableState<TData>);
      } else {
        setTableState(updater as unknown as TableState<TData>);
      }
    },
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enablePagination: true,
    enableSorting: true,
    manualPagination: false,
    manualSorting: false,
    manualFiltering: false,
    defaultColumn: {
      minSize: 40,
      maxSize: 1000,
      size: 180,
    },
    ...tableProps,
  }), [data, safeColumns, tableState, tableProps]);

  // Use the useMaterialReactTable hook instead of creating a new instance with constructor
  const tableInstance = useMaterialReactTable(tableOptions);

  // Handle state persistence
  const { loadState, saveState } = useLocalStorageSync({
    enabled: enableStatePersistence,
    storageKey: stateStorageKey,
  });

  // Handle backend sync
  const { syncState } = useBackendSync({
    enabled: enableBackendSync,
    options: backendSyncOptions,
  });

  // Handle PDF export
  const { exportToPDF } = usePDFExport({
    enabled: enablePDFExport,
    options: pdfExportOptions,
  });

  // Load initial state
  useEffect(() => {
    if (enableStatePersistence) {
      const savedState = loadState();
      if (savedState) {
        setTableState(savedState as TableState<TData>);
      }
    }
  }, [enableStatePersistence, loadState]);

  // Handle state changes
  const handleStateChange = useCallback(
    (newState: TableState<TData>) => {
      setTableState(newState);

      if (enableDebugMode) {
        console.log('Table state changed:', newState);
      }

      if (enableStatePersistence) {
        saveState(newState);
      }

      if (enableBackendSync) {
        syncState(newState as unknown as TableState<Record<string, any>>);
      }
    },
    [enableStatePersistence, enableBackendSync, enableDebugMode, saveState, syncState]
  );

  // Handle PDF export
  const handleExportPDF = useCallback(() => {
    if (enablePDFExport) {
      exportToPDF({
        data,
        columns: safeColumns as unknown as SmartTableColumn<Record<string, any>>[],
        state: tableState as unknown as TableState<Record<string, any>>,
      });
    }
  }, [enablePDFExport, exportToPDF, data, safeColumns, tableState]);

  // Handle sync state
  const handleSyncState = useCallback(() => {
    if (enableBackendSync) {
      syncState(tableState as unknown as TableState<Record<string, any>>);
    }
  }, [enableBackendSync, syncState, tableState]);

  return {
    tableState,
    tableInstance,
    handleStateChange,
    handleExportPDF,
    handleSyncState,
  };
}

export default useSmartTable;