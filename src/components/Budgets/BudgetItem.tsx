import { Button, Card, Col, Form, ProgressBar, Stack } from 'react-bootstrap'
import { Dispatch, FC, RefObject, SetStateAction } from 'react'
import { useBudgets } from '../../context/budgets-context'
import { currencyFormatter } from '../../utils'
import { BudgetType, ExpensesModalType } from '../../types/types'
import PencilIcon from '../common/Icons/PencilIcon'

interface PropsType extends BudgetType {
    amount: number
    progressBarVariant: string
    showExpensesModal: ({ title, id, max }: BudgetType, modalToShow: ExpensesModalType) => void
    setEditMode: Dispatch<SetStateAction<boolean>>
    editMode: boolean
    cardRef: RefObject<HTMLDivElement>
    handleModalShow: () => void
    handleBudgetTitle: (title: string) => void
    handleBudgetMax: (max: number) => void
    budgetExpensesAmount: number
}

const BudgetItem: FC<PropsType> = (
    {
        title,
        amount,
        max,
        id,
        progressBarVariant,
        showExpensesModal,
        editMode,
        cardRef,
        handleModalShow,
        handleBudgetTitle,
        handleBudgetMax,
        setEditMode,
        budgetExpensesAmount
    }) => {
    const { deleteBudget, } = useBudgets()

    return <Col md={6} lg={5}>
        <Card className={amount > max ? 'bg-danger bg-opacity-10' : 'bg-light'} ref={cardRef}>
            <Card.Body>
                <Card.Title className="d-flex align-items-baseline">
                    <h3>{editMode ?
                        <Form.Control
                            plaintext
                            defaultValue={title}
                            onChange={(e) => handleBudgetTitle(e.target.value)}
                        />
                        : title}
                    </h3>
                    <p className="ms-auto me-3 ps-3 d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}&nbsp;/&nbsp;
                        <span className="text-muted fs-6">{editMode ?
                            <Form.Control
                                plaintext
                                defaultValue={max}
                                type="number"
                                min={0}
                                step={0.01}
                                onChange={(e) => handleBudgetMax(+e.target.value)}
                            />
                            : currencyFormatter.format(max)}
                            </span>
                    </p>
                    <Button variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
                        <PencilIcon/>
                    </Button>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill mb-4"
                    variant={progressBarVariant}
                    min={0} max={max}
                    now={amount}
                />
                <Stack direction="horizontal" className="gap-4">
                    <Button
                        variant="outline-primary"
                        onClick={() => showExpensesModal({ title, id, max }, 'addExpense')}
                    >Add Expense</Button>
                    {budgetExpensesAmount !== 0 && <Button
                        variant="outline-secondary"
                        onClick={() => handleModalShow()}
                    >View Expenses</Button>}
                    <Button
                        className="ms-auto"
                        variant="danger"
                        onClick={() => deleteBudget(id)}
                    >Delete budget</Button>
                </Stack>
            </Card.Body>
        </Card>
    </Col>
}

export default BudgetItem