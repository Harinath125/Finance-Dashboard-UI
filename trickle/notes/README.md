# Finance Dashboard UI

A clean, interactive, and responsive frontend finance dashboard built using React and Tailwind CSS.

## Features Included
1. **Dashboard Overview**: Displays summary cards (Balance, Income, Expenses) and Chart.js based visualizations for Balance Trend and Spending Breakdown.
2. **Transactions Section**: Searchable, sortable, and filterable list of transactions.
3. **Role-Based UI**: Switch between `Admin` and `Viewer` via the top header dropdown. Admins can add, edit, and delete transactions. Viewers only see data.
4. **Insights Section**: Automated textual insights based on user spending behavior.
5. **State Management**: Built with React Context (`AppContext.js`) managing global state and persisting to `localStorage`.
6. **Dark Mode**: Fully supported via Tailwind CSS dark classes.
7. **Export Functionality**: Easily export transaction data to CSV format.

## Setup Instructions
No build step is required! The project uses React, Babel, and Tailwind CSS via CDNs. 
Simply serve the folder or open `index.html` directly in a browser.

## Technical Approach
- **React**: Functional components with hooks (`useState`, `useEffect`, `useMemo`, `useContext`).
- **Styling**: Tailwind CSS via CDN with customized utility classes in `<style type="text/tailwindcss">`.
- **Charts**: Chart.js for lightweight and performant visualizations.
- **Modularity**: Components are separated into distinct logical files for maintainability.