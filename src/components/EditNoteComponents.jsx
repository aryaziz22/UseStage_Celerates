import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditNoteForm = ({ ideaToEdit, onUpdateIdea, onCancel }) => {
  const [ideaText, setIdeaText] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (ideaToEdit) {
      setIdeaText(ideaToEdit.idea);
      setCategory(ideaToEdit.category);
    }
  }, [ideaToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ideaText.trim()) {
      console.warn("Ide tidak boleh kosong! Attempted to submit empty idea for edit.");
      return;
    }
    onUpdateIdea({ ...ideaToEdit, idea: ideaText, category });
  };

  if (!ideaToEdit) {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formEditIdeaText">
        <Form.Label>Edit Ide Anda</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={ideaText}
          onChange={(e) => setIdeaText(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEditIdeaCategory">
        <Form.Label>Kategori</Form.Label>
        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Edit kategori ide">
          <option value="career">Karir</option>
          <option value="motivation">Motivasi</option>
          <option value="lifestyle">Gaya Hidup</option>
          <option value="finance">Keuangan</option>
        </Form.Select>
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="outline-secondary" onClick={onCancel} className="me-2">
          Batal
        </Button>
        <Button variant="success" type="submit">
          <i className="bi bi-check-lg me-2"></i>Simpan Perubahan
        </Button>
      </div>
    </Form>
  );
};

export default EditNoteForm;