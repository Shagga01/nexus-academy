import { gql } from '@apollo/client';
import client from '../utils/apolloClient';

// Example GraphQL query blending PostgreSQL & Neo4j via a federated schema
const STUDENT_OVERVIEW_QUERY = gql`
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

export async function fetchStudentData() {
  try {
    const { data } = await client.query({
      query: STUDENT_OVERVIEW_QUERY
    });
    return data;
  } catch (error) {
    console.error("❌ Failed fetching student data:", error);
    return { students: [] };
  }
}
