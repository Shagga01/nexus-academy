import React, { useEffect, useState } from 'react';

const CurriculumLoader = () => {
  const [curriculum, setCurriculum] = useState([]);

  useEffect(() => {
    const fetchCurriculum = async () => {
      const levels = [
        "Primary1", "Primary2", "Primary3", "Primary4", "Primary5", "Primary6",
        "Secondary1", "Secondary2", "Secondary3", "Secondary4", "Secondary5", "Secondary6"
      ];

      let data = [];

      for (let level of levels) {
        for (let term = 1; term <= 3; term++) {
          try {
            const response = await fetch(/curriculum/plans/${level}/term${term}.json);
            if (response.ok) {
              const json = await response.json();
              data.push({
                classLevel: level,
                term: term,
                subjects: json.subjects || []
              });
            }
          } catch (err) {
            console.error(Error loading ${level} Term ${term}:, err);
          }
        }
      }

      setCurriculum(data);
    };

    fetchCurriculum();
  }, []);

  return (
    <div>
      <h2>📚 Universal Curriculum Loader</h2>
      {curriculum.length === 0 ? (
        <p>Loading curriculum...</p>
      ) : (
        curriculum.map((plan, idx) => (
          <div key={idx} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>{plan.classLevel} - Term {plan.term}</h3>
            <ul>
              {plan.subjects.map((subject, sidx) => (
                <li key={sidx}>{subject}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default CurriculumLoader;