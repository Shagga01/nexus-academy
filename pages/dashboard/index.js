export async function getServerSideProps() {
  const [feesRes, usersRes] = await Promise.all([
    fetch('http://localhost:3001/api/fees'),
    fetch('http://localhost:3001/api/users'),
  ]);
  const feesData = await feesRes.json();
  const usersData = await usersRes.json();

  return {
    props: {
      fees: feesData.data,
      users: usersData.data,
    },
  };
}

export default function Dashboard({ fees, users }) {
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalTeachers = users.filter(u => u.role === 'teacher').length;
  const totalFeesCollected = fees
    .filter(fee => fee.status === 'paid')
    .reduce((sum, fee) => sum + parseFloat(fee.amount), 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Total Teachers</h3>
          <p>{totalTeachers}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Total Fees Collected (USD)</h3>
          <p>${totalFeesCollected.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}