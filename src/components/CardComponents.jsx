import { Card, Badge, Col, Button } from "react-bootstrap";

const NoteCard = ({ idea, onEdit, onDelete }) => {
  const categoryStyles = {
    career: {
      backgroundColor: "#d0ebff", 
      badgeVariant: "primary",
      icon: "bi-briefcase",
    },
    finance: {
      backgroundColor: "#fff3cd", 
      badgeVariant: "warning",
      icon: "bi-cash-stack",
    },
    motivation: {
      backgroundColor: "#d1e7dd",
      badgeVariant: "success",
      icon: "bi-lightbulb",
    },
    lifestyle: {
      backgroundColor: "#e2e3ff", 
      badgeVariant: "info",
      icon: "bi-person-hearts",
    },
    other: {
      backgroundColor: "#f8f9fa", 
      badgeVariant: "secondary",
      icon: "bi-three-dots",
    },
  };

  const style = categoryStyles[idea.category] || categoryStyles.other;
  const textColor = "#000";

  const categoryLabel =
    {
      career: "Karier",
      finance: "Keuangan",
      motivation: "Motivasi",
      lifestyle: "Gaya Hidup",
      other: "Lainnya",
    }[idea.category] || "Lainnya";

  return (
    <Col md={4} className="mb-3">
      <Card
        className="h-100 shadow-sm note-card position-relative"
        style={{
          backgroundColor: style.backgroundColor,
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Tombol Edit & Delete di pojok kanan atas */}
        <div className="note-card-actions position-absolute top-2 end-2 d-flex gap-2">
          <Button
            variant="warning"
            size="sm"
            onClick={() => onEdit && onEdit(idea)}
            title="Edit Ide"
          >
            <i className="bi bi-pencil"></i>
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete && onDelete(idea)} 
            title="Hapus Ide"
          >
            <i className="bi bi-trash"></i>
          </Button>
        </div>

        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Badge bg={style.badgeVariant} className="py-2 px-3">
              <i className={`bi ${style.icon} me-1`}></i>
              {categoryLabel}
            </Badge>
          </div>

          <Card.Text className="mt-3" style={{ color: textColor }}>
            {idea.idea}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NoteCard;
