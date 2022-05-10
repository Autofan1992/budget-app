import { Dispatch, RefObject, SetStateAction } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { ExpenseType } from '../../types/types'
import { useBudgets } from '../../context/budgets-context'
import { currencyFormatter } from '../../utils'
import PencilIcon from '../common/Icons/PencilIcon'
import TrashIcon from '../common/Icons/TrashIcon'

interface PropsType extends ExpenseType {
    listItemRef: RefObject<HTMLAnchorElement>
    handleExpenseDesc: (description: string) => void
    handleExpenseAmount: (amount: number) => void
    editMode: boolean
    setEditMode: Dispatch<SetStateAction<boolean>>
}

const ExpenseItem = (
    {
        description,
        amount,
        id,
        budgetId,
        listItemRef,
        handleExpenseDesc,
        handleExpenseAmount,
        editMode,
        setEditMode
    }: PropsType) => {
    const { deleteExpense } = useBudgets()

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