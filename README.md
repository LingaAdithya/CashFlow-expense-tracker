# Flow

Flow is a modern, premium personal finance tracker built to help users seamlessly manage their income and expenses through a beautiful, calming, and highly interactive interface. 

Designed with a "soft-matte" aesthetic, it prioritizes a peaceful user experience over traditional, cluttered financial dashboards. 

## Features

- **Dashboard Summaries:** Real-time calculation of total balance, income, and expenses with animated number counters.
- **Smart Insights:** Automatically generated insights based on spending habits, such as top expense categories and savings rates.
- **Visual Analytics:** Interactive expense breakdown chart powered by Recharts.
- **Transaction Management:** Add, view, and delete transactions with a categorized list and smooth Framer Motion animations.
- **Data Persistence:** Instant saving to local storage ensures your financial data is retained across sessions.
- **Theming:** Full support for system, light, and a custom warm-charcoal dark mode.
- **Responsive Design:** A mobile-first approach ensuring a flawless experience on desktops, tablets, and smartphones.

## Tech Stack

- **Framework:** React 19, TypeScript, Vite
- **Styling:** TailwindCSS v4 with a custom warm color palette
- **UI Components:** Custom components built with accessibility in mind (Radix UI primitives)
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **Forms & Validation:** React Hook Form, Zod
- **Icons:** Lucide React
- **Date Formatting:** date-fns

## Project Structure

The codebase is organized modularly to separate concerns and ensure maintainability:

- `src/components/` - Reusable UI components organized by domain (`ui`, `layout`, `dashboard`, `forms`).
- `src/context/` - Global state management for Transactions and Theme.
- `src/utils/` - Helper functions for currency formatting, calculations, and local storage.
- `src/constants/` - Static configurations like category definitions.
- `src/types/` - TypeScript interface definitions.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your local machine.

### Installation

1. Clone the repository and navigate to the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the Vite development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create an optimized production build:
```bash
npm run build
```


