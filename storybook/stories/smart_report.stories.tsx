import type { Meta, StoryObj } from "@storybook/react";
import { SmartReport } from "@teziapp/smartreport";

const meta = {
  title: "Example/SmartReport",
  component: SmartReport,
  tags: ["docsPage"]
} satisfies Meta<typeof SmartReport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tableProps: {
      columns: [
        {
          accessorKey: 'id',
          header: 'ID',
          size: 50,
        },
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        {
          accessorKey: 'age',
          header: 'Age',
          size: 50,
        },
        {
          accessorKey: 'city',
          header: 'City',
        },
        {
          accessorKey: 'state',
          header: 'State',
          size: 50,
        },
        {
          accessorKey: 'email',
          header: 'Email',
        },
        {
          accessorKey: 'phone',
          header: 'Phone',
        },
        {
          accessorKey: 'department',
          header: 'Department',
        },
        {
          accessorKey: 'salary',
          header: 'Salary',
        },
      ],
      data: [
        { id: 1, firstName: 'John', lastName: 'Doe', age: 30, city: 'New York', state: 'NY', email: 'john@example.com', phone: '555-0101', department: 'Engineering', salary: 85000 },
        { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25, city: 'Los Angeles', state: 'CA', email: 'jane@example.com', phone: '555-0102', department: 'Sales', salary: 75000 },
        { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 45, city: 'Chicago', state: 'IL', email: 'bob@example.com', phone: '555-0103', department: 'Marketing', salary: 95000 },
        { id: 4, firstName: 'Alice', lastName: 'Brown', age: 28, city: 'Houston', state: 'TX', email: 'alice@example.com', phone: '555-0104', department: 'HR', salary: 70000 },
        { id: 5, firstName: 'Charlie', lastName: 'Wilson', age: 35, city: 'Phoenix', state: 'AZ', email: 'charlie@example.com', phone: '555-0105', department: 'Finance', salary: 90000 }
      ]
    }
  },
};