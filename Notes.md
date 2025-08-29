🛠️ Project Overview

This project implements a Daily Inventory Dashboard for SupplySight.
It allows users to:

Track inventory vs demand across warehouses.

Monitor KPIs (stock, demand, fill rate).

Filter/search products.

View product details in a drawer.

Update demand and transfer stock.

Visualize stock vs demand trends (7d/14d/30d).


⚙️ Tech Choices
Frontend

React (Vite) → fast development environment, modern tooling.

TailwindCSS → utility-first styling for rapid, consistent UI.

Recharts → responsive, declarative charts for trends.

Data Layer

Apollo Client → handles GraphQL queries, mutations, and caching.

Backend

Apollo Server → lightweight mock GraphQL server.


🧠 Business Logic
Status Rules

Healthy → stock > demand

Low → stock === demand

Critical → stock < demand

Filters

Search → matches product name, SKU, or ID.

Warehouse → filter by warehouse location.

Status → filter by Healthy / Low / Critical.

Pagination → 10 rows per page.

Mutations

updateDemand → updates demand for a product.

transferStock → reduces stock and reassigns to another warehouse.


✅ Trade-offs & Decisions

Used mock in-memory data instead of a real DB (time-boxed).

Chart data is simulated (not real historical data).

Minimal validation → only checks stock availability during transfers.

Prioritized clarity of business logic and UI responsiveness over pixel-perfect visuals.

Kept state management simple (local state + Apollo cache).


🚀 Improvements (with More Time)
Backend

Connect to a real database (Postgres + Prisma or MongoDB).

Add authentication + role-based access.

Track historical stock/demand for real KPI charts.

Frontend

Add column sorting in product table.

Improve responsive design for mobile users.

Add toast notifications (success/error).

Add skeleton loaders for better UX.

Advanced filters (multi-warehouse, stock range).

Testing

Unit tests for resolvers.

Integration tests with Cypress for UI flows.


⏱️ Time Management

Setup (React, Tailwind, Apollo): ~1h

GraphQL schema/resolvers: ~1h

UI components (TopBar, Filters, Table, Drawer): ~2h

Chart + KPI section + polish: ~1h

Documentation (README + NOTES): ~0.5h