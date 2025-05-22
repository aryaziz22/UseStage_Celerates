import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NoteForm = ({ onAddIdea, onCancel }) => {
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState('career');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idea.trim()) {
      console.warn("Ide tidak boleh kosong! Attempted to submit empty idea.");
      return;
    }
    onAddIdea({ idea, category });
    setIdea('');
    setCategory('career');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formNewIdeaText">
        <Form.Label>Ide Anda</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Tuliskan ide cemerlang Anda di sini..."
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNewIdeaCategory">
        <Form.Label>Kategori</Form.Label>
        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Pilih kategori ide">
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
        <Button variant="primary" type="submit">
          <i className="bi bi-save me-2"></i>Simpan Ide
        </Button>
      </div>
    </Form>
  );
};

export default NoteForm;