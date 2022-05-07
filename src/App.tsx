import React, { FC, useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import BudgetsList from './components/Budgets/BudgetsList'
import { UNCATEGORIZED_BUDGET_ID } from './context/budgets-context'
import AddBudgetModal from './components/Budgets/AddBudgetModal'
import AddExpenseModal from './components/Budgets/AddExpenseModal'
import { BudgetType, ExpensesModalType } from './types/types'
import ViewExpensesModal from './components/Budgets/ViewExpensesModal'

const App: FC = () => {
    const [showAddBudgetModal, setShowBudgetModal] = useState<boolean>(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false)
    const [showViewExpensesModal, setShowViewExpensesModal] = useState<boolean>(false)
    const [selectedBudget, setSelectedBudget] = useState<BudgetType>({
        name: UNCATEGORIZED_BUDGET_ID,
        id: UNCATEGORIZED_BUDGET_ID,
        max: 0
    })

    const handleExpensesModalShow = ({ id, name, max }: BudgetType, modalToShow: ExpensesModalType) => {
        if (modalToShow === 'addExpense') setShowAddExpenseModal(true)
        if (modalToShow === 'viewExpenses') setShowViewExpensesModal(true)
        setSelectedBudget({ id, name, max })
    }

    return <Container className="py-5 d-flex flex-column" style={{
        minHeight: '100vh'
    }}>
        <Stack gap={2} direction="horizontal" className="mb-5 gap-4">
            <h1>Budgets</h1>
            <Button variant="primary ms-auto" onClick={() => setShowBudgetModal(true)}>Add Budget</Button>
            <Button variant="outline-primary" onClick={() => handleExpensesModalShow({
                name: UNCATEGORIZED_BUDGET_ID,
                id: UNCATEGORIZED_BUDGET_ID,
                max: 0
            }, 'addExpense')}>Add Expense</Button>
        </Stack>
        <BudgetsList showExpensesModal={handleExpensesModalShow}/>
        <AddBudgetModal
            show={showAddBudgetModal} handleClose={setShowBudgetModal}/>
        <AddExpenseModal
            show={showAddExpenseModal} selectedBudget={selectedBudget}
            handleClose={setShowAddExpenseModal}/>
        <ViewExpensesModal
            show={showViewExpensesModal} selectedBudget={selectedBudget}
            handleClose={setShowViewExpensesModal}/>
    </Container>
}

export default App