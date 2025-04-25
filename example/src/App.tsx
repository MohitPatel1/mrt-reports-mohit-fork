import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { SmartMRT } from '../../src/components/smart_mrt';
import { SmartReport } from '../../src/components/smart_report';
import { SmartTableSettings } from '../../src/components/smart_table_settings';
import { sampleColumns, sampleData } from './data';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const App = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Smart MRT" />
          <Tab label="Smart Report" />
          <Tab label="Smart Table Settings" />
        </Tabs>
      </Box>

      <TabPanel value={currentTab} index={0}>
        <SmartMRT
          columns={sampleColumns}
          data={sampleData}
        />
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <SmartReport
          tableProps={{
            columns: sampleColumns,
            data: sampleData,
          }}
        />
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <SmartMRT
          columns={sampleColumns}
          data={sampleData}
          enableTableSettings
          tableSettings={{
            position: "right-drawer"
          }}
        />
      </TabPanel>
    </Box>
  );
};

export default App; 