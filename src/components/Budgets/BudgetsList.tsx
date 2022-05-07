import { Button, Card, Row, Stack } from 'react-bootstrap'
import BudgetItem from './BudgetItem'
import { FC } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../../context/budgets-context'
import { BudgetType, ExpensesModalType } from '../../types/types'
import { currencyFormatter } from '../../utils'

const BudgetsList: FC<PropsType> = ({ showExpensesModal }) => {
    const { budgets, getBudgetExpenses, totalBudgetAmount, totalExpensesAmount, getBudgetExpensesAmount } = useBudgets()
    const uncategorizedExpensesAmount = getBudgetExpensesAmount(UNCATEGORIZED_BUDGET_ID)
    const getProgressBarVariant = (amount: number, max: number) => {
        const ratio = amount / max
        if (ratio < .5) return 'primary'
        if (ratio < .75) return 'warning'
        return 'danger'
    }

    return <div className="flex-grow-1 d-flex flex-column">
        <Row className="g-4 flex-grow-1">
            {budgets.map(budget => {
                const amount = getBudgetExpenses(budget.id).reduce((acc, expense) => acc + expense.amount, 0)

                return <BudgetItem
                    key={budget.id}
                    id={budget.id}
                    name={budget.name} amount={amount}
                    max={budget.max}
                    getProgressBarVariant={getProgressBarVariant}
                    showExpensesModal={showExpensesModal}
                />
            })}
        </Row>
        {uncategorizedExpensesAmount > 0 && <Card className="bg-light mt-4">
            <Card.Body>
                <Card.Title className="d-flex align-items-baseline justify-content-between">
                    <h4>Uncategorized expenses</h4>
                    <p className="ms-2 d-flex align-items-baseline">{currencyFormatter.format(uncategorizedExpensesAmount)}</p>
                </Card.Title>
                <Stack direction="horizontal" className="justify-content-end gap-4">
                    <Button variant="outline-secondary" onClick={() => showExpensesModal({
                        name: UNCATEGORIZED_BUDGET_ID,
                        id: UNCATEGORIZED_BUDGET_ID,
                        max: 0
                    }, 'viewExpenses')}
                    >View Expenses</Button>
                </Stack>
            </Card.Body>
        </Card>}
        {totalExpensesAmount > 0 &&
            <Card
                className={'mt-4 ' + (totalExpensesAmount > totalBudgetAmount ? 'bg-danger bg-opacity-10' : 'bg-light')}>
                <Card.Body>
                    <Card.Title className="d-flex align-items-baseline justify-content-between">
                        <h4>Total expenses</h4>
                        <p className="ms-2 d-flex align-items-baseline">
                            {currencyFormatter.format(totalExpensesAmount)}&nbsp;/&nbsp;
                            <span className="text-muted fs-6">{currencyFormatter.format(totalBudgetAmount)}</span>
                        </p>
                    </Card.Title>
                </Card.Body>
            </Card>}
    </div>
}

export default BudgetsList

type PropsType = {
    showExpensesModal: ({ name, id, max }: BudgetType, modalToShow: ExpensesModalType) => void
}