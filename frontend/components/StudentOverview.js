import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import dynamic from 'next/dynamic';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchStudentData } from '../graphql/studentQueries';

const EChartsReact = dynamic(() => import('echarts-for-react'), { ssr: false });

const StudentOverview = () => {
  const [rowData, setRowData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStudentData().then(data => {
      setRowData(data.students);
      setChartData(buildChartData(data.students));
    });
  }, []);

  const buildChartData = (students) => {
    return {
      xAxis: { type: 'category', data: students.map(s => s.name) },
      yAxis: { type: 'value' },
      series: [{ data: students.map(s => s.academicScore), type: 'bar' }]
    };
  };

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Class", field: "class" },
    { headerName: "Academic Score", field: "academicScore" },
    { headerName: "Behavioral", field: "behavioralScore" },
    { headerName: "Psychomotor", field: "psychomotorScore" },
  ];

  return (
    <div>
      <h2>📊 Student Overview Dashboard</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true}/>
      </div>
      <EChartsReact option={chartData} style={{ height: 400, marginTop: 20 }}/>
    </div>
  );
};

export default StudentOverview;