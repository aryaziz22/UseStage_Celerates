import React from 'react';
import { Form, Button, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

const FilterBar = ({ activeFilter, onFilterChange, onSearch, onAddClick }) => {
  const categories = ["all", "career", "motivation", "lifestyle", "finance"];

  return (
    <div className="mb-4 p-3 border rounded shadow-sm bg-white filter-bar-container">
      <InputGroup className="mb-3 filter-bar-input-group">
        <Form.Control
          type="search"
          placeholder="Cari ide..."
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Cari ide"
        />
        <DropdownButton
          variant="outline-secondary"
          title={
            <>
              <i className="bi bi-funnel me-1"></i>
              Filter: {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
            </>
          }
          id="input-group-dropdown-filter"
          align="end"
        >
          {categories.map(category => (
            <Dropdown.Item
              key={category}
              active={activeFilter === category}
              onClick={() => onFilterChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </InputGroup>
      <Button variant="primary" onClick={onAddClick} className="w-100 py-2">
        <i className="bi bi-plus-circle-fill me-2"></i>Tambah Ide Baru
      </Button>
    </div>
  );
};

export default FilterBar;