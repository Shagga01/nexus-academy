import React from 'react';
import Head from 'next/head';
import CurriculumLoader from '../frontend/components/CurriculumLoader';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Nexus Academy Dashboard</title>
      </Head>
      <div style={{ padding: "20px" }}>
        <h1>🎓 Nexus Academy Dashboard</h1>

        {/* Your Curriculum Loader */}
        <CurriculumLoader />

        {/* Later you can easily add more */}
        {/* <FinancialDashboard /> */}
        {/* <StudentOverview /> */}
      </div>
    </>
  );
};

export default Dashboard;