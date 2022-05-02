import { Button, Form, Modal } from 'react-bootstrap'
import { Dispatch, FC, FormEvent, SetStateAction, useRef } from 'react'
import { useBudgets } from '../contexts/budgets-context'

const AddBudgetModal: FC<PropsType> = ({ show, handleClose }) => {
    const handleModalHide = () => handleClose(false)
    const { addBudget } = useBudgets()
    const nameRef = useRef<HTMLInputElement>(null)
    const maxRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        debugger
        e.preventDefault()

        if (nameRef.current && maxRef.current) {
            addBudget({
                name: nameRef.current.value,
                max: +maxRef.current.value
            })
            handleModalHide()
        } else {
            e.currentTarget.classList.add('isValidated')
        }
    }

    return <Modal show={show} onHide={handleModalHide}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Maximum spending</Form.Label>
                    <Form.Control type="number" ref={maxRef} min={0} step={0.01}/>
                </Form.Group>
                <div className="text-end">
                    <Button variant="primary" type="submit">Add budget</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
}

export default AddBudgetModal

type PropsType = {
    show: boolean
    handleClose: Dispatch<SetStateAction<boolean>>
}