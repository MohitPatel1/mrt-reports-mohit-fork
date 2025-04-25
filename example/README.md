# Smart Table Example

This is an example application demonstrating the usage of the Smart Table components library with local imports. It showcases the three main components:

1. SmartMRT - The base table component with enhanced features
2. SmartReport - A report-focused table with PDF export capabilities
3. SmartTableSettings - A configurable settings panel for table customization

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The application will be available at http://localhost:3000

## Features Demonstrated

- Basic table with sorting, filtering, and pagination
- Report generation with PDF export
- Table settings panel with various positioning options
- Material UI theming integration
- TypeScript type safety

## Project Structure

```
example/
├── src/
│   ├── App.tsx           # Main application component
│   ├── data.ts          # Sample data and column definitions
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Local Development

This example uses local imports from the parent project's `src` directory. This allows you to test changes to the library components in real-time without publishing to npm. 