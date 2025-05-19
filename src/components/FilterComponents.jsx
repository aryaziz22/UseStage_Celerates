import { useState } from 'react';
import { Dropdown, Form, Button, InputGroup } from 'react-bootstrap';

const FilterBar = ({ activeFilter, onFilterChange, onSearch, onAddClick }) => {
  const categories = [
    { id: "all", name: "Semua", icon: "bi-collection" },
    { id: "career", name: "Karier", icon: "bi-briefcase" },
    { id: "finance", name: "Keuangan", icon: "bi-cash-stack" },
    { id: "motivation", name: "Motivasi", icon: "bi-lightbulb" },
    { id: "lifestyle", name: "Gaya Hidup", icon: "bi-heart" },
    { id: "other", name: "Lainnya", icon: "bi-three-dots" }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const activeCategory = categories.find(cat => cat.id === activeFilter) || categories[0];

  return (
    <div className="filter-bar p-2 rounded mb-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <InputGroup className="me-3 mb-2" style={{ maxWidth: '300px', minWidth: '150px' }}>
          <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Cari ide..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>

        <div className="d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-filter">
              <i className={`bi ${activeCategory.icon} me-1`}></i>
              {activeCategory.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {categories.map(category => (
                <Dropdown.Item
                  key={category.id}
                  active={activeFilter === category.id}
                  onClick={() => onFilterChange(category.id)}
                >
                  <i className={`bi ${category.icon} me-2`}></i>
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Button 
            variant="success" 
            className="ms-3" 
            onClick={onAddClick}
          >
            <i className="bi bi-plus-circle me-1"></i> Tambah Ide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
