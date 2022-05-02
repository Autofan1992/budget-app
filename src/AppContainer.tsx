import App from './App'
import { FC, useState } from 'react'
import { BudgetsProvider } from './components/contexts/budgets-context'
import AddBudgetModal from './components/Budgets/AddBudgetModal'
import AddExpenseModal from './components/Budgets/AddExpenseModal'

const AppContainer: FC = () => {
    const [showBudgetModal, setShowBudgetModal] = useState(false)
    const [showExpenseModal, setShowExpenseModal] = useState(false)

    return <BudgetsProvider>
        <App handleBudgetModalShow={setShowBudgetModal} handleExpensesModalShow={setShowExpenseModal}/>
        <AddBudgetModal show={showBudgetModal} handleClose={setShowBudgetModal}/>
        <AddExpenseModal show={showExpenseModal} handleClose={setShowExpenseModal}/>
    </BudgetsProvider>
}

export default AppContainer