import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function EditModal({ open, handleClose, editData, setEditData, handleSave }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-appointment-modal"
    >
      <Box
      sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
      }}
      >
      <h2>Chỉnh sửa lịch hẹn</h2>
      {editData && (
          <form>
          <TextField
              label="Patient Name"
              name="PatientName"
              value={editData.PatientName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
          />
          <TextField
              label="Assigned Doctor"
              name="AssignedDoctor"
              value={editData.AssignedDoctor}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
          />
          <TextField
              label="Date"
              name="Date"
              value={editData.Date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
          />
          <TextField
              label="Diseases"
              name="Diseases"
              value={editData.Diseases}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
              Lưu
              </Button>
              <Button variant="outlined" onClick={handleClose}>
              Hủy
              </Button>
          </Box>
          </form>
      )}
      </Box>
    </Modal>
  )
}