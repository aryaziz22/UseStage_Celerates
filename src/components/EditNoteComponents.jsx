import { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const EditNoteForm = ({ ideaToEdit, onUpdateIdea, onCancel }) => {
  const [editedIdea, setEditedIdea] = useState({
    id: null,
    idea: "",
    category: "career"
  });

  const categoryOptions = [
    { value: "career", label: "Karier" },
    { value: "finance", label: "Keuangan" },
    { value: "motivation", label: "Motivasi" },
    { value: "lifestyle", label: "Gaya Hidup" },
    { value: "other", label: "Lainnya" }
  ];

  useEffect(() => {
    if (ideaToEdit) {
      setEditedIdea(ideaToEdit);
    }
  }, [ideaToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedIdea.idea.trim() === "") return;

    onUpdateIdea(editedIdea);
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="mb-3">
          <i className="bi bi-pencil-square me-2"></i>
          Edit Ide
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Edit ide..."
              value={editedIdea.idea}
              onChange={(e) =>
                setEditedIdea({ ...editedIdea, idea: e.target.value })
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
                  value={editedIdea.category}
                  onChange={(e) =>
                    setEditedIdea({ ...editedIdea, category: e.target.value })
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
            <Button
              variant="secondary"
              className="me-2"
              onClick={onCancel}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan Perubahan
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditNoteForm;
