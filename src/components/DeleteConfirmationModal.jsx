import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faExclamationTriangle,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import ToastNotification from "./ToastNotification";

function DeleteConfirmationModal({ handleDelete, notification }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showToast, setShowToast] = useState(true);

    return (
        <>
            <Button variant="danger" size="sm" onClick={handleShow}>
                Delete
            </Button>

            <ToastNotification
                type={notification.type}
                message={notification.message}
                showToast={notification.show && showToast}
                closeToast={() => setShowToast(false)}
            />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>Are you sure you want to proceed?</p>
                    <p>
                        <FontAwesomeIcon
                            size="6x"
                            icon={faExclamationTriangle}
                            color="red"
                        />
                    </p>
                    <small>You won't be able to revert this!</small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} /> No
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleDelete();
                            handleClose();
                            setShowToast(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faCheck} /> Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteConfirmationModal;
