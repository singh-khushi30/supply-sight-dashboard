📦 SupplySight Dashboard

A polished Supply Chain Inventory Dashboard built as part of a frontend challenge.
It demonstrates how to design a modern React frontend, wire it to a GraphQL API, and apply business logic for real-world supply chain use cases.

✨ Features

📊 KPI Cards → Total Stock, Total Demand, Fill Rate

📑 Products Table → with pagination, search, and filters

🎨 Status Pills → Healthy / Low / Critical (critical rows highlighted)

📂 Product Drawer → update demand and transfer stock between warehouses

📈 Line Chart → Stock vs Demand trend (7d / 14d / 30d ranges)

🔗 Mock GraphQL API → Queries + Mutations for products, warehouses, KPIs


🛠️ Tech Stack

Frontend → React + Vite + TailwindCSS

Data Layer → Apollo Client (GraphQL)

Backend → Apollo Server (mock GraphQL)

Charts → Recharts


🚀 Getting Started
1. Clone Repo
git clone https://github.com/singh-khushi30/supply-sight-dashboard.git
cd supply-sight

2. Start Backend
cd server
npm install
node index.js

3. Start Frontend
cd ../supplysight-dashboard
npm install
npm run dev

👩‍💻 Author

Built with ❤️ by Khushi Singh (@singh-khushi30
)