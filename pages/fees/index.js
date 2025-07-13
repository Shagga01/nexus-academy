import { useState } from 'react';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/api/fees');
  const data = await res.json();

  return {
    props: {
      fees: data.data,
    },
  };
}

export default function FeesPage({ fees }) {
  const [currency, setCurrency] = useState('USD');
  const conversionRates = {
    USD: 1,
    GBP: 0.78, // Example static rate: adjust to use live API later
  };
  const currencySymbols = {
    USD: '$',
    GBP: '£',
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Student Fees Records</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="currency-select">Select currency: </label>
        <select
          id="currency-select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD ($)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Amount ({currencySymbols[currency]})</th>
            <th>Paid On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id}>
              <td>{fee.id}</td>
              <td>{fee.student_id}</td>
              <td>
                {currencySymbols[currency]}
                {(fee.amount * conversionRates[currency]).toFixed(2)}
              </td>
              <td>
                {fee.paid_on
                  ? new Date(fee.paid_on).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>{fee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}