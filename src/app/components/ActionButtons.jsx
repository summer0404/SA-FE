// components/ActionButtons.js
'use client';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ActionButtons = ({ onEdit, onDelete, itemId }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
      <button
        style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          color: 'white'
        }}
        onClick={() => onEdit(itemId)}
        title="Chỉnh sửa"
      >
        <FaEdit />
      </button>
      <button
        style={{
          backgroundColor: '#f44336',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          color: 'white'
        }}
        onClick={() => onDelete(itemId)}
        title="Xóa"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default ActionButtons;