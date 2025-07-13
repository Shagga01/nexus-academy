export async function getServerSideProps() {
  // Fetch data from your backend API
  const res = await fetch('http://localhost:3001/api/subjects');
  const data = await res.json();

  return {
    props: {
      subjects: data.data,
    },
  };
}

export default function SubjectsPage({ subjects }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Subjects Offered</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject.subject_id}>
              <td>{subject.subject_id}</td>
              <td>{subject.name}</td>
              <td>{subject.description}</td>
              <td>
                <img src={subject.thumbnail_url} alt={subject.name} width="50" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}