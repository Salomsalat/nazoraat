import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";

const EditModal = ({ open, onClose, book, onSave }) => {
  const [status, setStatus] = useState(book?.status);

  useEffect(() => {
    if (book) setStatus(book.status);
  }, [book]);

  const handleSubmit = () => {
    if (!book) return;
    onSave({ ...book, status });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value={1}>New</MenuItem>
            <MenuItem value={2}>Reading</MenuItem>
            <MenuItem value={3}>Finished</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
