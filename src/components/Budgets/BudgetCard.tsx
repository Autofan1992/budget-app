import { Button, Card, Col, ProgressBar, Stack } from 'react-bootstrap'
import { FC } from 'react'
import { currencyFormatter } from '../../utils'

const BudgetCard: FC<PropsType> = ({ name, amount, max, getProgressBarVariant }) => {
    return <Col md={6} lg={4}>
        <Card className={amount > max ? 'bg-danger bg-opacity-10' : 'bg-light'}>
            <Card.Body>
                <Card.Title className="d-flex align-items-baseline justify-content-between">
                    <h3>{name}</h3>
                    <p className="ms-2 d-flex align-items-baseline">
                        {currencyFormatter.format(amount)} /
                        <span className="text-muted fs-6">&nbsp;{currencyFormatter.format(max)}</span>
                    </p>
                </Card.Title>
                <ProgressBar
                    className="rounded-pill mb-4"
                    variant={getProgressBarVariant(amount, max)}
                    min={0} max={max}
                    now={amount}
                />
                <Stack direction="horizontal" className="justify-content-end gap-4">
                    <Button variant="outline-primary">Add Expense</Button>
                    <Button variant="outline-secondary">View Expenses</Button>
                </Stack>
            </Card.Body>
        </Card>
    </Col>
}

export default BudgetCard

type PropsType = {
    name: string
    amount: number
    max: number
    getProgressBarVariant: (amount: number, max: number) => string
}