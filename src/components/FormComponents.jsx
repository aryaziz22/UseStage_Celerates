import { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const NoteForm = ({ onAddIdea }) => {
  const [newIdea, setNewIdea] = useState({
    idea: "",
    category: "career" 
  });

  const categoryOptions = [
    { value: "career", label: "Karier" },
    { value: "motivation", label: "Motivasi" },
    { value: "lifestyle", label: "Gaya Hidup" },
    { value: "finance", label: "Keuangan" },
    { value: "other", label: "Lainnya" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newIdea.idea.trim() === "") return;

    onAddIdea(newIdea);
    setNewIdea({
      idea: "",
      category: "career" 
    });
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="mb-3">
          <i className="bi bi-plus-circle me-2"></i>
          Tambah Catatan Baru
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Tulis ide baru..."
              value={newIdea.idea}
              onChange={(e) =>
                setNewIdea({ ...newIdea, idea: e.target.value })
              }
              rows={2}
            />
          </Form.Group>

          <Row>
            <Col md={12} className="mb-3">
              <Form.Group>
                <Form.Label>
                  <i className="bi bi-tag me-1"></i>
                  Kategori
                </Form.Label>
                <Form.Select
                  value={newIdea.category}
                  onChange={(e) =>
                    setNewIdea({ ...newIdea, category: e.target.value })
                  }
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end">
            <Button type="submit" variant="primary">
              <i className="bi bi-plus-lg me-1"></i>
              Tambah Ide
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NoteForm;
