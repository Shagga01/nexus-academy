import React from 'react';
import Head from 'next/head';
import StudentOverview from '../../components/StudentOverview';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>📊 Master Dashboard | Nexus Academy</title>
      </Head>
      <main style={{ padding: '2rem' }}>
        <h1>🚀 Master Analytics Dashboard</h1>
        <StudentOverview />
      </main>
    </>
  );
};

export default Dashboard;