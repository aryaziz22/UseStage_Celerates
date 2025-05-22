import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

// Import Components
import TimeDisplay from './components/TimeComponents';
import FilterBar from './components/FilterComponents';
import NoteForm from './components/FormComponents';
import NoteCollection from './components/NoteComponents';
import EditNoteForm from './components/EditNoteComponents';

// Import CSS
import './App.css'; 

// Main Application Component
const App = () => {
  const [ideas, setIdeas] = useState([
    { id: 1, idea: "Saya ingin membuka jasa desain grafis untuk usaha kecil", category: "career" },
    { id: 2, idea: "Membangun aplikasi mobile sederhana untuk membantu pelajar", category: "motivation" },
    { id: 3, idea: "Membuat blog edukatif seputar pengembangan diri", category: "motivation" },
    { id: 4, idea: "Menjadwalkan waktu olahraga agar tetap sehat selama kuliah", category: "lifestyle" },
    { id: 5, idea: "Belajar keuangan digital untuk mempersiapkan masa depan", category: "finance" },
  ]);

  const [filter, setFilter] = useState("all");
  const [lastAdded, setLastAdded] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [ideaToEdit, setIdeaToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ideaToDelete, setIdeaToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (ideas.length > 0 && !lastAdded) {
        setLastAdded(new Date());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const addIdea = (newIdea) => {
    const newIdeaObject = {
      id: ideas.length > 0 ? Math.max(...ideas.map((idea) => idea.id)) + 1 : 1,
      idea: newIdea.idea,
      category: newIdea.category,
    };
    setIdeas([...ideas, newIdeaObject]);
    setLastAdded(new Date());
    setShowAddModal(false);
  };

  const handleEdit = (idea) => {
    setIdeaToEdit(idea);
    setShowEditModal(true);
  };

  const updateIdea = (updatedIdeaData) => {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === updatedIdeaData.id ? updatedIdeaData : idea
    );
    setIdeas(updatedIdeas);
    setShowEditModal(false);
    setLastAdded(new Date());
    setIdeaToEdit(null);
  };

  const confirmDelete = (idea) => {
    setIdeaToDelete(idea);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (ideaToDelete) {
      setIdeas(ideas.filter((idea) => idea.id !== ideaToDelete.id));
      setShowDeleteModal(false);
      setIdeaToDelete(null);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredIdeas = ideas.filter((idea) => {
    const matchFilter = filter === "all" || idea.category === filter;
    const matchSearch = idea.idea.toLowerCase().includes(searchTerm);
    return matchFilter && matchSearch;
  });

  return (
    <Container className="py-4 app-container">
      <header className="text-center mb-4 pb-3 border-bottom">
        <h1 className="display-5 fw-bold">
          <i className="bi bi-lightbulb me-2"></i> {/* Style applied via App.css */}
          Collect Notes
        </h1>
        <p className="text-muted lead">
          Tempat menyimpan gagasan cemerlang dan mimpi masa depan Anda.
        </p>
      </header>

      <TimeDisplay lastAdded={lastAdded} />

      <Row className="justify-content-center mt-4">
        <Col lg={8} md={10} sm={12}>
          <FilterBar
            activeFilter={filter}
            onFilterChange={setFilter}
            onSearch={handleSearch}
            onAddClick={() => setShowAddModal(true)}
          />
        </Col>
      </Row>

      {filteredIdeas.length > 0 ? (
        <NoteCollection
          ideas={filteredIdeas}
          onEdit={handleEdit}
          onDelete={confirmDelete}
        />
      ) : (
        <Row className="justify-content-center mt-5">
          <Col md={8} className="text-center">
            <div className="p-4 py-5 border rounded bg-light shadow-sm no-notes-block">
              <i className="bi bi-journal-x display-4 text-primary mb-3"></i>
              <h4 className="mb-3">Tidak Ada Catatan Ditemukan</h4>
              <p className="text-muted">
                {searchTerm && filter !== "all"
                  ? `Tidak ada catatan yang cocok dengan pencarian "${searchTerm}" dan kategori "${filter}". Coba ubah filter atau kata kunci pencarian Anda.`
                  : searchTerm
                  ? `Tidak ada catatan yang cocok dengan pencarian "${searchTerm}". Coba kata kunci lain.`
                  : filter !== "all"
                  ? `Tidak ada catatan dalam kategori "${filter}". Coba kategori lain atau tampilkan 'Semua'.`
                  : "Anda belum menambahkan catatan apapun. Klik tombol 'Tambah Ide Baru' di atas untuk memulai!"}
              </p>
            </div>
          </Col>
        </Row>
      )}

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title><i className="bi bi-plus-circle-fill me-2"></i>Tambah Ide Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NoteForm onAddIdea={addIdea} onCancel={() => setShowAddModal(false)} />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title><i className="bi bi-pencil-square me-2"></i>Edit Ide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditNoteForm
            ideaToEdit={ideaToEdit}
            onUpdateIdea={updateIdea}
            onCancel={() => {
              setShowEditModal(false);
              setIdeaToEdit(null);
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title><i className="bi bi-exclamation-triangle-fill me-2"></i>Hapus Ide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Yakin ingin menghapus ide berikut?</p>
          <blockquote className="blockquote mb-0 bg-light p-3 rounded">
            <p className="mb-1 fst-italic">"{ideaToDelete?.idea}"</p>
            <footer className="blockquote-footer mt-1 text-end">
              Kategori: <cite title="Source Title">{ideaToDelete?.category}</cite>
            </footer>
          </blockquote>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <i className="bi bi-trash3-fill me-2"></i>Ya, Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;