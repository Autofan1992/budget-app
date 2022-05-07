import { Button, Card, Col, Form, ProgressBar, Stack } from 'react-bootstrap'
import { FC, useRef, useState } from 'react'
import { useBudgets } from '../../context/budgets-context'
import { currencyFormatter } from '../../utils'
import { BudgetType, ExpensesModalType } from '../../types/types'
import useOutsideClick from '../../hooks/useOutsideClick'

const BudgetItem: FC<PropsType> = ({ name, amount, max, id, getProgressBarVariant, showExpensesModal }) => {
    const [editMode, setEditMode] = useState(false)
    const { getBudgetExpensesAmount, editBudget, deleteBudget } = useBudgets()
    const budgetExpensesAmount = getBudgetExpensesAmount(id)
    const cardRef = useRef<HTMLInputElement>(null)

    useOutsideClick(cardRef, setEditMode)

    const inputStyle = {
        padding: '.1em',
        borderColor: '#0d6efd'
    }

    return <Col md={6} lg={5}>
        <Card className={amount > max ? 'bg-danger bg-opacity-10' : 'bg-light'} ref={cardRef}>
            <Card.Body>
                <Card.Title className="d-flex align-items-baseline">
                    <h3>{editMode ?
                        <Form.Control style={inputStyle} plaintext defaultValue={name} onChange={(e) => editBudget({
                            name: e.target.value,
                            max,
                            id
                        })}/>
                        : name}
                    </h3>
                    <p className="ms-auto me-3 ps-3 d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}&nbsp;/&nbsp;
                        <span className="text-muted fs-6">{editMode ?
                            <Form.Control style={inputStyle} plaintext defaultValue={max} type="number" min={0}
                                          step={0.01} onChange={(e) => editBudget({
                                name,
                                max: +e.target.value,
                                id
                            })}/>
                            : currencyFormatter.format(max)}
                            </span>
                    </p>
                    <Button variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </Button>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill mb-4"
                    variant={getProgressBarVariant(amount, max)}
                    min={0} max={max}
                    now={amount}
                />
                <Stack direction="horizontal" className="gap-4">
                    <Button
                        variant="outline-primary"
                        onClick={() => showExpensesModal({ name, id, max }, 'addExpense')}>Add
                        Expense</Button>
                    {budgetExpensesAmount !== 0 && <Button
                        variant="outline-secondary"
                        onClick={() => showExpensesModal({
                            name,
                            id,
                            max
                        }, 'viewExpenses')}
                    >View Expenses</Button>}
                    <Button className="ms-auto" variant="danger" onClick={() => deleteBudget(id)}>Delete
                        budget</Button>
                </Stack>
            </Card.Body>
        </Card>
    </Col>
}

export default BudgetItem

type PropsType = {
    name: string
    amount: number
    max: number
    id: string
    getProgressBarVariant: (amount: number, max: number) => string
    showExpensesModal: ({ name, id, max }: BudgetType, modalToShow: ExpensesModalType) => void
}