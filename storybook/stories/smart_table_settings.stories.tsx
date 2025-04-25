import type { Meta, StoryObj } from "@storybook/react";
// Use a local mock instead of importing from @teziapp/smartreport
import { SmartTableSettings } from "@teziapp/smartreport";
import { MRT_TableInstance } from 'material-react-table';
import React from 'react';

// Sample table data and columns for demonstration
const sampleColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

// Mock MRT_TableInstance for Storybook
const mockTableInstance = {
  getState: () => ({
    globalFilter: '',
  }),
  setGlobalFilter: () => {},
  columns: sampleColumns,
  data: sampleData,
} as unknown as MRT_TableInstance<Record<string, any>>;

const meta = {
  title: "Components/SmartTableSettings",
  component: SmartTableSettings,
  tags: ["autodocs"],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A configurable table settings component that provides search, filter, sort, group, and column visibility controls. Can be positioned in various ways around the table.',
      },
    },
  },
} satisfies Meta<typeof SmartTableSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base story with all features enabled
export const AllFeatures: Story = {
  args: {
    table: mockTableInstance,
    tableSettings: {
      position: "right-drawer",
    },
  },
};

// Different position variants
export const LeftDrawer: Story = {
  args: {
    table: mockTableInstance,
    tableSettings: {
      position: "left-drawer",
    },
  },
};

export const RightDrawer: Story = {
  args: {
    table: mockTableInstance,
    tableSettings: {
      position: "right-drawer",
    },
  },
};

export const TopBar: Story = {
  args: {
    table: mockTableInstance,
    tableSettings: {
      position: "top",
    },
  },
};

export const BottomBar: Story = {
  args: {
    table: mockTableInstance,
    tableSettings: {
      position: "bottom",
    },
  },
};