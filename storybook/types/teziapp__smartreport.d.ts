/**
 * Type definitions for @teziapp/smartreport
 */
declare module '@teziapp/smartreport' {
  import type { FC } from 'react';
  import type { MRT_TableInstance } from 'material-react-table';
  
  export interface SmartTableSettingsProps {
    table: MRT_TableInstance<any>;
    tableSettings: {
      position?: 'left-drawer' | 'right-drawer' | 'bottom' | 'top' | 'floating';
    };
  }
  
  export const SmartTableSettings: FC<SmartTableSettingsProps>;
  export const SmartReport: FC<any>;
  export const SmartReportMRT: FC<any>;
} 