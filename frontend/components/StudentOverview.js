import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import dynamic from 'next/dynamic';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const EChartsReact = dynamic(() => import('echarts-for-react'), { ssr: false });

const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      name
      class
      academicScore
      behavioralScore
      psychomotorScore
    }
  }
`;

const StudentOverview = () => {
  const [chartData, setChartData] = useState({});
  const { loading, error, data } = useQuery(GET_STUDENTS);

  useEffect(() => {
    if (data && data.students) {
      setChartData(buildChartData(data.students));
    }
  }, [data]);

  const buildChartData = (students) => ({
    xAxis: { type: 'category', data: students.map(s => s.name) },
    yAxis: { type: 'value' },
    series: [
      { data: students.map(s => s.academicScore), type: 'bar', name: 'Academic' },
      { data: students.map(s => s.behavioralScore), type: 'bar', name: 'Behavioral' },
      { data: students.map(s => s.psychomotorScore), type: 'bar', name: 'Psychomotor' }
    ],
    tooltip: {},
    legend: { data: ['Academic', 'Behavioral', 'Psychomotor'] }
  });

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Class", field: "class" },
    { headerName: "Academic Score", field: "academicScore" },
    { headerName: "Behavioral", field: "behavioralScore" },
    { headerName: "Psychomotor", field: "psychomotorScore" },
  ];

  if (loading) return <p>Loading student data...</p>;
  if (error) return <p>Error fetching student data: {error.message}</p>;

  return (
    <div>
      <h2>📊 Student Overview Dashboard</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={data.students}
          columnDefs={columnDefs}
          pagination={true}
        />
      </div>
      <EChartsReact
        option={chartData}
        style={{ height: 400, marginTop: 20 }}
      />
    </div>
  );
};

export default StudentOverview;