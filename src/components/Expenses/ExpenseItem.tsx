import { useRef, useState } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'
import { ExpenseType } from '../../types/types'
import { useBudgets } from '../../context/budgets-context'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { currencyFormatter } from '../../utils'
import PencilIcon from '../common/Icons/PencilIcon'
import TrashIcon from '../common/Icons/TrashIcon'

const ExpenseItem = ({ description, amount, id, budgetId }: ExpenseType) => {
    const { editExpense, deleteExpense } = useBudgets()
    const listItemRef = useRef<HTMLAnchorElement>(null)
    const [editMode, setEditMode] = useState(false)

    useOutsideClick(listItemRef, setEditMode)

    const handleExpenseDesc = (description: string) => editExpense({
        description,
        amount,
        id
    })

    const handleExpenseAmount = (amount: number) => editExpense({
        description,
        amount,
        id
    })

    return <ListGroup.Item ref={listItemRef}>
        <div className="d-flex align-items-end">
            <h5 className="mb-0">{editMode ?
                <Form.Control
                    plaintext
                    defaultValue={description}
                    onChange={(e) => handleExpenseDesc(e.target.value)}
                />
                : description}</h5>
            <h6 className="ms-3 mb-0">{editMode ?
                <Form.Control
                    plaintext
                    defaultValue={amount}
                    type="number"
                    min={0}
                    step={0.01}
                    onChange={(e) => handleExpenseAmount(+e.target.value)}
                />
                : currencyFormatter.format(amount)}</h6>
            <Button className="ms-auto me-3" variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
                <PencilIcon/>
            </Button>
            <Button variant="danger" size="sm" onClick={() => deleteExpense(id, budgetId)}>
                <TrashIcon/>
            </Button>
        </div>
    </ListGroup.Item>
}

export default ExpenseItem