import { Row, Col } from 'react-bootstrap';
import NoteCard from './CardComponents';

const NoteCollection = ({ ideas, filter, onEdit, onDelete }) => {
  const filteredIdeas = filter === "all" 
    ? ideas 
    : ideas.filter(idea => idea.category === filter);
  
  return (
    <Row>
      {filteredIdeas.length === 0 ? (
        <Col xs={12} className="text-center my-5">
          <div className="empty-state">
            <i className="bi bi-sticky display-1 text-muted"></i>
            <p className="mt-3 text-muted">Tidak ada catatan yang ditemukan.</p>
          </div>
        </Col>
      ) : (
        filteredIdeas.map(idea => (
          <NoteCard 
            key={idea.id} 
            idea={idea} 
            onEdit={onEdit}    
            onDelete={onDelete} 
          />
        ))
      )}
    </Row>
  );
};

export default NoteCollection;