import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';

const NoteCard = ({ idea, onEdit, onDelete }) => {
  const categoryStyles = {
    career: {
      backgroundColor: "#d0ebff", 
      badgeVariant: "primary",
      icon: "bi-briefcase",
      textColor: "#000000" 
    },
    finance: {
      backgroundColor: "#fff3cd", 
      badgeVariant: "warning",
      icon: "bi-cash-stack",
      textColor: "#000000"
    },
    motivation: {
      backgroundColor: "#d1e7dd", 
      badgeVariant: "success",
      icon: "bi-lightbulb",
      textColor: "#000000"
    },
    lifestyle: {
      backgroundColor: "#e2e3ff", 
      badgeVariant: "info",
      icon: "bi-person-hearts",
      textColor: "#000000"
    },
    other: { 
      backgroundColor: "#f8f9fa", 
      badgeVariant: "secondary",
      icon: "bi-three-dots",
      textColor: "#000000"
    },
  };

  const currentStyle = categoryStyles[idea.category] || categoryStyles.other;

  return (
    <Col md={6} lg={4} className="mb-4 d-flex align-items-stretch">
      <Card 
        className="w-100 shadow-sm note-card"
        style={{ backgroundColor: currentStyle.backgroundColor }} 
      >
        <Card.Body className="d-flex flex-column">
          <div className="mb-2">
            <Badge 
              pill 
              bg={currentStyle.badgeVariant} 
              className="py-1 px-2"
            >
              <i className={`bi ${currentStyle.icon} me-1`}></i> 
              {idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}
            </Badge>
          </div>
          <Card.Text 
            className="flex-grow-1 small" 
            style={{ color: currentStyle.textColor }} 
          >
            {idea.idea}
          </Card.Text>
          <div className="mt-auto d-flex justify-content-end">
            <Button variant="outline-primary" size="sm" onClick={() => onEdit(idea)} className="me-2" aria-label={`Edit ide: ${idea.idea}`}>
              <i className="bi bi-pencil-square"></i> Edit
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(idea)} aria-label={`Hapus ide: ${idea.idea}`}>
              <i className="bi bi-trash"></i> Hapus
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const NoteCollection = ({ ideas, onEdit, onDelete }) => {
  return (
    <Row className="mt-4">
      {ideas.map((idea) => (
        <NoteCard key={idea.id} idea={idea} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Row>
  );
};

export default NoteCollection;