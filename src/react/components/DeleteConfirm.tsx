import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  onConfirm: Function;
}

const DeleteConfirm = ({ onConfirm }: Props) => {
  const [show, setShow] = useState(false);

  const onClose = () => setShow(false);

  return (
    <>
      <Button size="sm" variant="danger" onClick={() => setShow(true)}>
        Delete
      </Button>

      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>Are you sure?</Modal.Header>
        <Modal.Body>This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirm;
