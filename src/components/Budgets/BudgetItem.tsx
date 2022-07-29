import { FC, memo, useRef, useState } from 'react'
import { useBudgets } from '../../context/budgets-context'
import { BudgetType, ExpensesModalType } from '../../types/types'
import useOutsideClick from '../../hooks/useOutsideClick'
import { Button, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap'
import { currencyFormatter } from '../../utils'
import PencilIcon from '../common/Icons/PencilIcon'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type PropsType = BudgetType & {
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
    const { getBudgetExpensesTotal, editBudget, deleteBudget, getBudgetExpensesData } = useBudgets()
    const expensesTotal = getBudgetExpensesTotal(id)
    const expensesAmounts = getBudgetExpensesData(id, 'amounts')
    const expensesLabels = getBudgetExpensesData(id, 'labels')
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

    const data = {
        labels: expensesLabels,
        datasets: [
            {
                label: '# of Votes',
                data: expensesAmounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Col md={6}>
        <Card className={amount > max ? 'bg-danger bg-opacity-10' : 'bg-light'} ref={cardRef}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col xs={9} lg={10}>
                            <h3>{editMode ?
                                <Form.Control
                                    plaintext
                                    defaultValue={title}
                                    onChange={(e) => handleBudgetTitle(e.target.value)}
                                />
                                : title}
                            </h3>
                        </Col>
                        <Col xs="auto" className="ms-auto">
                            <Button variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
                                <PencilIcon/>
                            </Button>
                        </Col>
                        <Col xs={12}>
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
                    </Row>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill mb-4"
                    variant={progressBarVariant}
                    min={0} max={max}
                    now={amount}
                />
                <Row className='mb-4 justify-content-center'>
                    <Col xs={8} lg={6}>
                        <Pie data={data}  />
                    </Col>
                </Row>
                <Row className="g-3">
                    <Col>
                        <Button
                            className="w-100"
                            variant="outline-primary"
                            onClick={() => showExpensesModal({ title, id, max }, 'addExpense')}
                        >Add Expense</Button>
                    </Col>
                    <Col xs={12} lg={4} className="order-3 order-lg-2">
                        {expensesTotal !== 0 && (
                            <Button
                                className="w-100"
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