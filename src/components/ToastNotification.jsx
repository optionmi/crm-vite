import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastNotification({
    type,
    message,
    showToast,
    closeToast,
}) {
    return (
        <ToastContainer position="top-center" containerPosition="fixed">
            <Toast
                onClose={closeToast}
                show={showToast}
                delay={3000}
                autohide
                bg={type}
            >
                <Toast.Body className="text-white fw-bold text-center">
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}
