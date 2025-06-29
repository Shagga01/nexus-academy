import React, { useEffect, useState } from 'react';
import { fetchFinancialData } from '../graphql/financialQueries';

const FinancialDashboard = () => {
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    fetchFinancialData().then(data => {
      setFinancialData(data);
      enforceLockouts(data?.defaulters || []);
    });
  }, []);

  const enforceLockouts = (defaulters) => {
    defaulters.forEach(defaulter => {
      console.log(🔒 Locking out user ${defaulter.name} (${defaulter.email}) for non-payment of ${defaulter.amountOwed});
      // Backend API call goes here
    });
  };

  if (!financialData) return <p>Loading financial dashboard...</p>;

  return (
    <div>
      <h2>💵 Financial Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={cardStyle}>Total Revenue: ${financialData.totalRevenue}</div>
        <div style={cardStyle}>Expenses: ${financialData.totalExpenses}</div>
        <div style={cardStyle}>Commission: ${financialData.commissionRevenue}</div>
        <div style={cardStyle}>Profit/Loss: ${financialData.profitLoss}</div>
      </div>

      <h3>Fee Defaulters (auto-locked)</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Amount Owed</th></tr>
        </thead>
        <tbody>
          {financialData.defaulters.map(defaulter => (
            <tr key={defaulter.id}>
              <td>{defaulter.name}</td>
              <td>{defaulter.email}</td>
              <td>${defaulter.amountOwed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  borderRadius: '8px',
  minWidth: '180px',
  textAlign: 'center'
};

export default FinancialDashboard;