import { gql } from "@apollo/client";

// Fetch products with filters
export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $warehouse: String, $status: String, $page: Int, $limit: Int) {
    products(search: $search, warehouse: $warehouse, status: $status, page: $page, limit: $limit) {
      id
      name
      sku
      warehouse
      stock
      demand
      status
    }
  }
`;

// Fetch warehouses
export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses
  }
`;

// Fetch KPI data
export const GET_KPIS = gql`
  query GetKPIs($range: Int!) {
    kpis(range: $range) {
      date
      stock
      demand
    }
  }
`;

// Mutation: Update Demand
export const UPDATE_DEMAND = gql`
  mutation UpdateDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) {
      id
      name
      demand
      stock
      status
    }
  }
`;

// Mutation: Transfer Stock
export const TRANSFER_STOCK = gql`
  mutation TransferStock($id: ID!, $quantity: Int!, $toWarehouse: String!) {
    transferStock(id: $id, quantity: $quantity, toWarehouse: $toWarehouse) {
      id
      name
      stock
      warehouse
      status
    }
  }
`;
