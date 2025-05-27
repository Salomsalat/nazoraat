import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const BookModal = ({ open, onClose, isbn, setIsbn, onCreate }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate();
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box component="form" onSubmit={handleSubmit} sx={style}>
        <Typography variant="h6" mb={2}>
          Create a book
        </Typography>
        <div className="flex flex-col">
          <Typography variant="body2" mb={0.5}>
            ISBN
          </Typography>
          <input
            className="border p-2 mb-5 rounded"
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
            required
          />
        </div>
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Close</Button>
          <Button type="submit" variant="contained" >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookModal;
