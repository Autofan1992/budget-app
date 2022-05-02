import { Button, Form, Modal } from 'react-bootstrap'
import { Dispatch, FC, FormEvent, SetStateAction, useRef, useState } from 'react'
import { useBudgets } from '../contexts/budgets-context'

const AddBudgetModal: FC<PropsType> = ({ show, handleClose }) => {
    const [validated, setValidated] = useState(false)
    const handleModalHide = () => handleClose(false)
    const { addBudget } = useBudgets()
    const nameRef = useRef<HTMLInputElement>(null)
    const maxRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget

        if (!form.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            if (nameRef.current && maxRef.current) {
                addBudget({
                    name: nameRef.current.value,
                    max: +maxRef.current.value
                })
                handleModalHide()
            }
        }

        setValidated(true)
    }

    return <Modal show={show} onHide={handleModalHide}>
        <Form noValidate onSubmit={handleSubmit} validated={validated}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required placeholder="Type budget name"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Maximum spending</Form.Label>
                    <Form.Control type="number" ref={maxRef} min={1} step={0.01} placeholder='Type budget maximum' required/>
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