import { useRef, useState } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { ExpenseType } from '../../types/types'
import { useBudgets } from '../../context/budgets-context'
import { currencyFormatter } from '../../utils'

const ExpenseItem = ({ description, amount, id, budgetId }: ExpenseType) => {
    const { deleteExpense, editExpense } = useBudgets()
    const listItemRef = useRef<HTMLAnchorElement>(null)
    const [editMode, setEditMode] = useState(false)

    useOutsideClick(listItemRef, setEditMode)

    const inputStyle = {
        padding: '.1em',
        borderColor: '#0d6efd'
    }

    return <ListGroup.Item ref={listItemRef}>
        <div className="d-flex align-items-end">
            <h5 className="mb-0">{editMode ?
                <Form.Control
                    style={inputStyle} plaintext defaultValue={description} onChange={(e) => editExpense({
                    description: e.target.value,
                    amount,
                    id
                })}/>
                : description}</h5>
            <h6 className="ms-3 mb-0">{editMode ?
                <Form.Control
                    style={inputStyle} plaintext defaultValue={amount} type="number" min={0} step={0.01}
                    onChange={(e) => editExpense({
                        description,
                        amount: +e.target.value,
                        id
                    })}/>
                : currencyFormatter.format(amount)}</h6>
            <Button className="ms-auto me-3" variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </Button>
            <Button variant="danger" size="sm" onClick={() => deleteExpense(id, budgetId)}>&times;</Button>
        </div>
    </ListGroup.Item>
}

export default ExpenseItem