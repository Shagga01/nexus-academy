// 📚 Curriculum Graph Schema for Neo4j

CREATE CONSTRAINT ON (c:Class) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT ON (s:Subject) ASSERT s.name IS UNIQUE;
CREATE CONSTRAINT ON (t:Topic) ASSERT t.title IS UNIQUE;
CREATE CONSTRAINT ON (w:Week) ASSERT w.number IS UNIQUE;

// Example nodes & relationships

CREATE (y1:Class {id: "Year 1"})
CREATE (math:Subject {name: "Mathematics"})
CREATE (nb:Topic {title: "Number Bonds"})
CREATE (w1:Week {number: 1})

CREATE (y1)-[:OFFERS]->(math)
CREATE (math)-[:COVERS]->(nb)
CREATE (nb)-[:SCHEDULED_FOR]->(w1)
