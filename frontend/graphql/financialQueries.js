import { gql } from "@apollo/client";
import client from './apolloClient';

export const GET_FINANCIAL_DATA = gql`
  query GetFinancialDashboard {
    financialDashboard {
      totalRevenue
      totalExpenses
      commissionRevenue
      profitLoss
      defaulters {
        id
        name
        email
        amountOwed
      }
    }
  }
`;

export async function fetchFinancialData() {
  try {
    const { data } = await client.query({
      query: GET_FINANCIAL_DATA,
      fetchPolicy: "no-cache"
    });
    return data.financialDashboard;
  } catch (err) {
    console.error("Financial data fetch error:", err);
    return null;
  }
}