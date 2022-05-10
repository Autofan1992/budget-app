import React, { FC, useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import BudgetsList from '../Budgets/BudgetsList'
import { UNCATEGORIZED_BUDGET_ID } from '../../context/budgets-context'
import AddBudgetModal from '../Budgets/AddBudgetModal'
import AddExpenseModal from '../Expenses/AddExpenseModal'
import { BudgetType, ExpensesModalType } from '../../types/types'
import ViewExpensesModal from '../Expenses/ViewExpensesModal'
import ErrorToast from '../common/ErrorToast/ErrorToast'

const App: FC = () => {
    const [showAddBudgetModal, setShowBudgetModal] = useState<boolean>(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false)
    const [showViewExpensesModal, setShowViewExpensesModal] = useState<boolean>(false)
    const [selectedBudget, setSelectedBudget] = useState<BudgetType>({
        title: UNCATEGORIZED_BUDGET_ID,
        id: UNCATEGORIZED_BUDGET_ID,
        max: 0
    })

    const handleExpensesModalShow = ({ id, title, max }: BudgetType, modalToShow: ExpensesModalType) => {
        if (modalToShow === 'addExpense') setShowAddExpenseModal(true)
        if (modalToShow === 'viewExpenses') setShowViewExpensesModal(true)
        setSelectedBudget({ id, title, max })
    }

    return <div className="wrapper py-3 py-md-4 py-lg-5">
        <ErrorToast/>
        <Container className="d-flex flex-column">
            <Stack gap={2} direction="horizontal" className="mb-5 gap-4">
                <h1>Budgets</h1>
                <Button variant="primary ms-auto" onClick={() => setShowBudgetModal(true)}>Add Budget</Button>
                <Button variant="outline-primary" onClick={() => handleExpensesModalShow({
                    title: UNCATEGORIZED_BUDGET_ID,
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
    </div>
}

export default App