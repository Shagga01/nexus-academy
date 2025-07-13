import React, { useEffect, useState } from 'react';

export default function CurriculumLoader() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const res = await fetch('/api/curriculum');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurriculum();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📚 Universal Curriculum Loader</h2>
      <pre style={{ background: '#eee', padding: '1rem' }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
