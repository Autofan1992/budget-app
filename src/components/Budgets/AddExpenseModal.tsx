import { Button, Form, Modal } from 'react-bootstrap'
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../../context/budgets-context'
import { BudgetType } from '../../types/types'

const AddExpenseModal: FC<PropsType> = ({ show, handleClose, selectedBudget }) => {
    const handleModalHide = () => handleClose(false)
    const { addExpense, budgets } = useBudgets()
    const budgetRefId = useRef<HTMLSelectElement>(null)
    const descRef = useRef<HTMLInputElement>(null)
    const amountRef = useRef<HTMLInputElement>(null)
    const [selectedBudgetName, setBudgetName] = useState<string>()
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        setBudgetName(selectedBudget.name)
    }, [selectedBudget])

    const handleSelectedBudgetName = (e: ChangeEvent<HTMLSelectElement>) => {
        setBudgetName(e.target.options[e.target.selectedIndex].text)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!e.currentTarget.checkValidity()) {
            e.stopPropagation()
        } else if (amountRef.current && budgetRefId.current && descRef.current) {
            addExpense({
                description: descRef.current.value,
                amount: +amountRef.current.value,
                budgetId: budgetRefId.current.value
            })
            handleModalHide()
        }
        setValidated(true)
    }

    return <Modal show={show} onHide={handleModalHide}>
        <Form onSubmit={handleSubmit} validated={validated}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedBudgetName === UNCATEGORIZED_BUDGET_ID ? 'New expense' : 'Add Expense to ' + selectedBudgetName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" ref={descRef} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" min={0} step={0.01} ref={amountRef} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="budget">
                    <Form.Label>Budget</Form.Label>
                    <Form.Select onChange={handleSelectedBudgetName} ref={budgetRefId} defaultValue={selectedBudget.id}>
                        <option value={UNCATEGORIZED_BUDGET_ID}>{UNCATEGORIZED_BUDGET_ID}</option>
                        {budgets.map(budget => <option key={budget.id} value={budget.id}>{budget.name}</option>)}
                    </Form.Select>
                </Form.Group>
                <div className="text-end">
                    <Button variant="primary" type="submit">Add Expense</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
}

export default AddExpenseModal

type PropsType = {
    selectedBudget: Omit<BudgetType, 'max'>
    show: boolean
    handleClose: Dispatch<SetStateAction<boolean>>
}