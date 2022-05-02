import React, { FC } from 'react'
import './App.css'
import { Button, Container, Stack } from 'react-bootstrap'
import BudgetsContainer from './components/Budgets/BudgetsContainer'

const App: FC<PropsType> = ({handleBudgetModalShow, handleExpensesModalShow}) => {
    return <Container className="py-5">
        <Stack gap={2} direction="horizontal" className="mb-5 gap-4">
            <h1>Budgets</h1>
            <Button variant="primary ms-auto" onClick={() => handleBudgetModalShow(true)}>Add Budget</Button>
            <Button variant="outline-primary" onClick={() => handleExpensesModalShow(true)}>Add Expense</Button>
        </Stack>
        <BudgetsContainer/>
    </Container>
}

export default App

type PropsType = {
    handleBudgetModalShow: (value: boolean) => void
    handleExpensesModalShow: (value: boolean) => void
}