const { ApolloServer, gql } = require("apollo-server");

console.log("✅ Starting Apollo Server...");

// Mock Data
let products = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
];

// Schema
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
    status: String!
  }

  type KPI {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, warehouse: String, status: String, page: Int, limit: Int): [Product!]!
    warehouses: [String!]!
    kpis(range: Int!): [KPI!]!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product!
    transferStock(id: ID!, quantity: Int!, toWarehouse: String!): Product!
  }
`;

// Resolvers
const resolvers = {
  Product: {
    status: (p) => {
      if (p.stock > p.demand) return "Healthy";
      if (p.stock === p.demand) return "Low";
      return "Critical";
    },
  },
  Query: {
    products: (_, { search, warehouse, status, page = 1, limit = 10 }) => {
      let filtered = products;

      // Search
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(s) ||
            p.sku.toLowerCase().includes(s) ||
            p.id.toLowerCase().includes(s)
        );
      }

      // Warehouse filter
      if (warehouse) {
        filtered = filtered.filter((p) => p.warehouse === warehouse);
      }

      //  Status filter
      if (status) {
        filtered = filtered.filter((p) => {
          if (status === "Healthy") return p.stock > p.demand;
          if (status === "Low") return p.stock === p.demand;
          if (status === "Critical") return p.stock < p.demand;
          return true;
        });
      }

      //  Pagination
      const start = (page - 1) * limit;
      const end = start + limit;
      return filtered.slice(start, end);
    },

    warehouses: () => [...new Set(products.map((p) => p.warehouse))],

    kpis: (_, { range }) => {

      return Array.from({ length: range }, (_, i) => ({
        date: `Day-${i + 1}`,
        stock: products.reduce((sum, p) => sum + p.stock, 0) - i * 2,
        demand: products.reduce((sum, p) => sum + p.demand, 0)- i,
      }));
    },
  },

  Mutation: {
    updateDemand: (_, { id, demand }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Not found");
      product.demand = demand;
      return product;
    },

    transferStock: (_, { id, quantity, toWarehouse }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Not found");
      if (product.stock < quantity) throw new Error("Not enough stock");

      // Reduce stock in current warehouse
      product.stock -= quantity;

      // If product already exists in target warehouse, increase its stock
      let target = products.find(
        (p) => p.sku === product.sku && p.warehouse === toWarehouse
      );
      if (target) {
        target.stock += quantity;
      } else {
        // Otherwise create a new product entry in the new warehouse
        products.push({
          ...product,
          id: product.id + "-" + toWarehouse,
          warehouse: toWarehouse,
          stock: quantity,
        });
      }

      return product;
    },
  },
};

// Start server
const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({
    port: 4000,
    cors: {
      origin: "http://localhost:5173", 
      credentials: true,
    },
  })
  .then(({ url }) => {
    console.log(`🚀 Mock GraphQL server ready at ${url}`);
  });
