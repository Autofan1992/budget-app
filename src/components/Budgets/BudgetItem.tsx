import { FC, memo, useRef, useState } from 'react'
import { useBudgets } from '../../context/budgets-context'
import { BudgetType, ExpensesModalType } from '../../types/types'
import useOutsideClick from '../../hooks/useOutsideClick'
import { Button, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap'
import { currencyFormatter } from '../../utils'
import PencilIcon from '../common/Icons/PencilIcon'

interface PropsType extends BudgetType {
    amount: number
    getProgressBarVariant: (amount: number, max: number) => string
    showExpensesModal: ({ title, id, max }: BudgetType, modalToShow: ExpensesModalType) => void
}

const BudgetItem: FC<PropsType> = memo((
    {
        title,
        amount,
        max,
        id,
        getProgressBarVariant,
        showExpensesModal,
    }) => {
    const [editMode, setEditMode] = useState(false)
    const { getBudgetExpensesAmount, editBudget, deleteBudget } = useBudgets()
    const budgetExpensesAmount = getBudgetExpensesAmount(id)
    const cardRef = useRef<HTMLDivElement>(null)
    const progressBarVariant = getProgressBarVariant(amount, max)

    useOutsideClick(cardRef, setEditMode)

    const handleModalShow = () => showExpensesModal({
        title,
        id,
        max
    }, 'viewExpenses')

    const handleBudgetTitle = (title: string) => editBudget({
        title,
        id,
        max
    })

    const handleBudgetMax = (max: number) => editBudget({
        title,
        id,
        max
    })

    return <Col md={6}>
        <Card className={amount > max ? 'bg-danger bg-opacity-10' : 'bg-light'} ref={cardRef}>
            <Card.Body>
                <Card.Title>
                    <Row className='flex-lg-nowrap'>
                        <Col className="order-lg-1">
                            <h3>{editMode ?
                                <Form.Control
                                    plaintext
                                    defaultValue={title}
                                    onChange={(e) => handleBudgetTitle(e.target.value)}
                                />
                                : title}
                            </h3>
                        </Col>
                        <Col xs={12} className="order-3 order-lg-2 col-lg">
                            <p className="d-flex align-items-baseline">
                                {currencyFormatter.format(amount)}&nbsp;/&nbsp;
                                <span className="text-muted fs-6">{editMode ?
                                    <Form.Control
                                        plaintext
                                        defaultValue={max}
                                        type="number"
                                        min={0}
                                        step={0.1}
                                        onChange={(e) => handleBudgetMax(+e.target.value)}
                                    />
                                    : currencyFormatter.format(max)}
                            </span>
                            </p>
                        </Col>
                        <Col xs="auto" className="order-lg-3">
                            <Button variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
                                <PencilIcon/>
                            </Button>
                        </Col>
                    </Row>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill mb-4"
                    variant={progressBarVariant}
                    min={0} max={max}
                    now={amount}
                />
                <Row className='g-3'>
                    <Col>
                        <Button
                            className='w-100'
                            variant="outline-primary"
                            onClick={() => showExpensesModal({ title, id, max }, 'addExpense')}
                        >Add Expense</Button>
                    </Col>
                    <Col xs={12} lg={4} className='order-3 order-lg-2'>
                        {budgetExpensesAmount !== 0 && (
                            <Button
                                className='w-100'
                                variant="outline-secondary"
                                onClick={() => handleModalShow()}
                            >View Expenses</Button>
                        )}
                    </Col>
                    <Col>
                        <Button
                            className="w-100"
                            variant="danger"
                            onClick={() => deleteBudget(id)}
                        >Delete budget</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </Col>
})

export default BudgetItem