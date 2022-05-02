import { createContext, FC, ReactNode, useContext, useId } from 'react'
import { BudgetType, ExpenseType } from '../../types/types'
import useLocalStorage from '../../hooks/useLocalStorage'

export const BudgetsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage<Array<BudgetType>>('budgets', [])
    const [expenses, setExpenses] = useLocalStorage<Array<ExpenseType>>('expenses', [])
    //TODO: fix budget and expense id
    const newBudgetId = useId()

    const getBudgetExpenses = (budgetId: string) => expenses.filter((expense) => expense.budgetId === budgetId)

    const addExpense = ({ description, amount, budgetId }: Omit<ExpenseType, 'id'>) => {
        setExpenses(prevState => [...prevState, {
            id: newBudgetId,
            description,
            amount,
            budgetId
        }])
    }

    const addBudget = ({ name, max }: Omit<BudgetType, 'id'>) => {
        setBudgets(prevState => {
            if (prevState.find(budget => budget.name === name)) return prevState

            return [...prevState, { id: newBudgetId, name, max }]
        })
    }

    const deleteBudget = ({ id }: { id: string }) => {
        setBudgets(prevState => prevState.filter(budget => budget.id !== id))
    }

    const deleteExpense = ({ id }: { id: string }) => {
        setExpenses(prevState => prevState.filter(expense => expense.budgetId !== id))
    }

    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetsContext.Provider>
}
const BudgetsContext = createContext({} as ContextType)

export const useBudgets = () => useContext(BudgetsContext)

type ContextType = {
    budgets: Array<BudgetType>
    expenses: Array<ExpenseType>
    getBudgetExpenses: (budgetId: string) => Array<ExpenseType>
    addExpense: ({ description, amount, budgetId }: Omit<ExpenseType, 'id'>) => void
    addBudget: ({ name, max }: Omit<BudgetType, 'id'>) => void
    deleteBudget: ({ id }: { id: string }) => void
    deleteExpense: ({ id }: { id: string }) => void
}
