import { gql } from '@apollo/server';

export const typeDefs = gql`
  scalar DateTime
  scalar JSON

  enum Role {
    ADMIN
    TEACHER
    PARENT
    STUDENT
  }

  enum CourseStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Course {
    id: ID!
    title: String!
    description: String
    price: Float!
    isPublished: Boolean!
    status: CourseStatus!
    durationHours: Int!
    teacher: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Module {
    id: ID!
    title: String!
    description: String
    order: Int!
    course: Course!
    lessons: [Lesson!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Lesson {
    id: ID!
    title: String!
    content: String!
    videoUrl: String
    order: Int!
    learningObjectives: String
    autoQuizJson: JSON
    createdAt: DateTime!
    updatedAt: DateTime!
    assignments: [Assignment!]!
  }

  type Enrollment {
    id: ID!
    student: User!
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
    lesson: Lesson!
    assignedTo: User!
    grades: [Grade!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Grade {
    id: ID!
    assignment: Assignment!
    student: User!
    score: Int!
    feedback: String
    submittedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Transaction {
    id: ID!
    user: User!
    amount: Float!
    currency: String!
    status: String!
    paymentMethod: String
    transactionRef: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type QRResponse {
    message: String!
    qrCode: String!
  }

  type TwoFAResult {
    success: Boolean!
  }

  type OwnerAccess {
    masterOverride: Boolean!
    message: String!
  }

  type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
    courses: [Course!]!
    course(id: ID!): Course
    alphaOwnerData(secretKey: String!): OwnerAccess
  }

  type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!): String
    login(email: String!, password: String!, otp: String): AuthPayload
    signup(email: String!, password: String!, firstName: String!, lastName: String!, role: Role): AuthPayload

    enableTwoFA: QRResponse
    verifyTwoFA(token: String!): TwoFAResult

    createCourse(title: String!, description: String, price: Float!, isPublished: Boolean, teacherId: String!): Course
    updateCourse(id: ID!, title: String, description: String, price: Float, isPublished: Boolean, teacherId: String): Course
    deleteCourse(id: ID!): Course

    enroll(courseId: ID!): Enrollment
  }
`