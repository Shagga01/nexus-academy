// src/graphql/schema.ts
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime
  scalar Decimal

  enum Role {
    ADMIN
    TEACHER
    PARENT
    STUDENT
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
    studentProfile: StudentProfile
    teacherProfile: TeacherProfile
    parentProfile: ParentProfile
    adminProfile: AdminProfile
    enrollments: [Enrollment!]!
    createdCourses: [Course!]!
    assignments: [Assignment!]!
    grades: [Grade!]!
    transactions: [Transaction!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type StudentProfile {
    id: ID!
    userId: String!
    user: User!
    dateOfBirth: DateTime
    address: String
    phoneNumber: String
  }

  type TeacherProfile {
    id: ID!
    userId: String!
    user: User!
    bio: String
    qualifications: String
  }

  type ParentProfile {
    id: ID!
    userId: String!
    user: User!
  }

  type AdminProfile {
    id: ID!
    userId: String!
    user: User!
  }

  type Course {
    id: ID!
    title: String!
    description: String
    price: Decimal!
    isPublished: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    teacherId: String!
    teacher: User!
    modules: [Module!]!
    enrollments: [Enrollment!]!
  }

  type Module {
    id: ID!
    title: String!
    description: String
    order: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    courseId: String!
    course: Course!
    lessons: [Lesson!]!
  }

  type Lesson {
    id: ID!
    title: String!
    content: String!
    videoUrl: String
    order: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    moduleId: String!
    module: Module!
    assignments: [Assignment!]!
  }

  type Enrollment {
    id: ID!
    studentId: String!
    student: User!
    courseId: String!
    course: Course!
    enrollmentDate: DateTime!
    completed: Boolean!
    progress: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Assignment {
    id: ID!
    title: String!
    description: String
    dueDate: DateTime
    maxScore: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    lessonId: String!
    lesson: Lesson!
    assignedToId: String!
    assignedTo: User!
    grades: [Grade!]!
  }

  type Grade {
    id: ID!
    assignmentId: String!
    assignment: Assignment!
    studentId: String!
    student: User!
    score: Int!
    feedback: String
    submittedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Transaction {
    id: ID!
    userId: String!
    user: User!
    amount: Decimal!
    currency: String!
    status: String!
    paymentMethod: String
    transactionRef: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # ===========================================
  # 👑 Secure Owner-only type
  # ===========================================
  type OwnerSecretData {
    masterOverride: Boolean!
    message: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    # 🔥 Added secure owner query
    alphaOwnerData(secretKey: String!): OwnerSecretData!
  }

  type Mutation {
    signup(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      role: Role
    ): AuthPayload!

    login(email: String!, password: String!): AuthPayload!

    createCourse(
      title: String!
      description: String
      price: Decimal!
      isPublished: Boolean
      teacherId: String!
    ): Course!

    updateCourse(
      id: ID!
      title: String
      description: String
      price: Decimal
      isPublished: Boolean
      teacherId: String
    ): Course!

    deleteCourse(id: ID!): Course!
  }
`;