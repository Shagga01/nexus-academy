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
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Student Fees Records</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Amount</th>
            <th>Paid On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fees.map(fee => (
            <tr key={fee.id}>
              <td>{fee.id}</td>
              <td>{fee.student_id}</td>
              <td>{fee.amount}</td>
              <td>{fee.paid_on ? new Date(fee.paid_on).toLocaleDateString() : 'N/A'}</td>
              <td>{fee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}