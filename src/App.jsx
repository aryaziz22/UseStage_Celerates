import { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import TimeDisplay from "./components/TimeComponents";
import FilterBar from "./components/FilterComponents";
import NoteForm from "./components/FormComponents";
import NoteCollection from "./components/NoteComponents";
import EditNoteForm from "./components/EditNoteComponents";
import "./App.css";

const App = () => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      idea: "Saya ingin membuka jasa desain grafis untuk usaha kecil",
      category: "career",
    },
    {
      id: 2,
      idea: "Membangun aplikasi mobile sederhana untuk membantu pelajar",
      category: "motivation",
    },
    {
      id: 3,
      idea: "Membuat blog edukatif seputar pengembangan diri",
      category: "motivation",
    },
    {
      id: 4,
      idea: "Menjadwalkan waktu olahraga agar tetap sehat selama kuliah",
      category: "lifestyle",
    },
    {
      id: 5,
      idea: "Belajar keuangan digital untuk mempersiapkan masa depan",
      category: "finance",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [lastAdded, setLastAdded] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [ideaToEdit, setIdeaToEdit] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ideaToDelete, setIdeaToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const updateIdea = (updatedIdea) => {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === updatedIdea.id ? updatedIdea : idea
    );
    setIdeas(updatedIdeas);
    setShowEditModal(false);
    setLastAdded(new Date());
  };

  const confirmDelete = (idea) => {
    setIdeaToDelete(idea);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setIdeas(ideas.filter((idea) => idea.id !== ideaToDelete.id));
    setShowDeleteModal(false);
    setIdeaToDelete(null);
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
    <Container className="py-4">
      <header className="text-center mb-4">
        <h1 className="display-5 fw-bold">
          <i className="bi bi-lightbulb me-2"></i>
          Collect Notes
        </h1>
        <p className="text-muted">
          Tempat menyimpan gagasan cemerlang dan mimpi masa depan
        </p>
      </header>

      <TimeDisplay lastAdded={lastAdded} />

      <Row>
        <Col lg={8} className="mx-auto">
          <FilterBar
            activeFilter={filter}
            onFilterChange={setFilter}
            onSearch={handleSearch}
            onAddClick={() => setShowAddModal(true)}
          />
        </Col>
      </Row>

      <NoteCollection
        ideas={filteredIdeas}
        filter={filter}
        onEdit={handleEdit}
        onDelete={confirmDelete}
      />

      {/* Modal tambah ide */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Ide Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NoteForm onAddIdea={addIdea} />
        </Modal.Body>
      </Modal>

      {/* Modal edit ide */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Ide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditNoteForm
            ideaToEdit={ideaToEdit}
            onUpdateIdea={updateIdea}
            onCancel={() => setShowEditModal(false)}
          />
        </Modal.Body>
      </Modal>

      {/* Modal konfirmasi delete */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Hapus Ide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Yakin ingin menghapus ide berikut?</p>
          <blockquote className="blockquote mb-0">
            <p className="mb-1">"{ideaToDelete?.idea}"</p>
          </blockquote>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
