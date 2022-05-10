import { FC, useEffect, useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import './ErrorToast.scss'
import { useBudgets } from '../../../context/budgets-context'

const ErrorToast: FC = () => {
    const { error, setError } = useBudgets()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (error) setShow(true)
    }, [error])

    const handleClose = () => {
        setShow(false)
        setTimeout(() => setError(null), 1000)
    }

    return (
        <ToastContainer position="middle-center" className="p-3 app-error-toast">
            <Toast className="app-error-toast" onClose={handleClose} show={show} delay={3000} autohide>
                <Toast.Header className="justify-content-between">
                    <strong>Uuups!</strong>
                </Toast.Header>
                <Toast.Body className="text-danger">{error}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ErrorToast