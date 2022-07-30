import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react'
import { BudgetType, ExpenseType } from '../types/types'
import useLocalStorage from '../hooks/useLocalStorage'
import { v4 as createId } from 'uuid'

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

const BudgetsContext = createContext({} as ContextType)

export const useBudgets = () => useContext(BudgetsContext)

export const BudgetsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage<Array<BudgetType>>('budgets', [])
    const [expenses, setExpenses] = useLocalStorage<Array<ExpenseType>>('expenses', [])
    const [error, setError] = useState(null as string | null)
    const getBudgetExpenses = (budgetId: string) => expenses.filter((expense) => expense.budgetId === budgetId)
    const getBudgetExpensesTotal = (budgetId: string) => getBudgetExpenses(budgetId).reduce((acc, expense) => acc + expense.amount, 0)

    const getBudgetExpensesData = (budgetId: string, type: 'labels' | 'amounts') => getBudgetExpenses(budgetId).reduce((arr: Array<string | number>, expense) => {
        if (type === 'labels') arr.push(expense.description)
        if (type === 'amounts') arr.push(expense.amount)
        return arr
    }, [])

    const totalExpensesAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0)
    const totalBudgetAmount = budgets.reduce((acc, budget) => acc + budget.max, 0)

    const addExpense = ({ description, amount, budgetId }: Omit<ExpenseType, 'id'>) => {
        setExpenses(prevState => [{
            id: createId(),
            description,
            amount,
            budgetId
        }, ...prevState])
    }

    const addBudget = ({ title, max }: Omit<BudgetType, 'id'>) => {
        setBudgets(prevState => {
            if (prevState.find(budget => budget.title === title)) {
                setError('Budget with the same title already exists')
                return prevState
            }

            return [{ id: createId(), title, max }, ...prevState]
        })
    }

    const editBudget = ({ title, max, id }: BudgetType) => {
        setBudgets(prevState => prevState.map(budget => {
            if (budget.id === id) {
                budget.title = title
                budget.max = max
            }
            return budget
        }))
    }

    const editExpense = ({ description, amount, id }: Omit<ExpenseType, 'budgetId'>) => {
        setExpenses(prevState => prevState.map(expense => {
            if (expense.id === id) {
                expense.description = description
                expense.amount = amount
            }
            return expense
        }))
    }

    const deleteBudget = (id: string) => {
        setBudgets(prevState => prevState.filter(budget => budget.id !== id))
        setExpenses(prevState => prevState.map(expense => {
                if (expense.budgetId === id) {
                    expense.budgetId = UNCATEGORIZED_BUDGET_ID
                }
                return expense
            })
        )
    }

    const deleteExpense = (id: string, budgetId: string) => {
        if (budgetId === UNCATEGORIZED_BUDGET_ID) {
            setExpenses(prevState => prevState.filter(expense => expense.id !== id))
        }
        setExpenses(prevState => prevState.map(expense => {
                if (expense.id === id) {
                    expense.budgetId = UNCATEGORIZED_BUDGET_ID
                }
                return expense
            })
        )
    }

    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        totalBudgetAmount,
        totalExpensesAmount,
        getBudgetExpensesTotal,
        getBudgetExpenses,
        addExpense,
        editExpense,
        addBudget,
        editBudget,
        deleteBudget,
        deleteExpense,
        error,
        setError,
        getBudgetExpensesData
    }}>
        {children}
    </BudgetsContext.Provider>
}

type ContextType = {
    budgets: Array<BudgetType>
    expenses: Array<ExpenseType>
    getBudgetExpenses: (budgetId: string) => Array<ExpenseType>
    getBudgetExpensesTotal: (budgetId: string) => number
    totalBudgetAmount: number
    totalExpensesAmount: number
    addExpense: ({ description, amount, budgetId }: Omit<ExpenseType, 'id'>) => void
    editExpense: ({ description, amount, id }: Omit<ExpenseType, 'budgetId'>) => void
    addBudget: ({ title, max }: Omit<BudgetType, 'id'>) => void
    editBudget: ({ title, max, id }: BudgetType) => void
    deleteBudget: (id: string) => void
    deleteExpense: (id: string, budgetId: string) => void
    error: string | null
    setError: Dispatch<SetStateAction<string | null>>
    getBudgetExpensesData: (budgetId: string, data: 'labels' | 'amounts') => Array<string | number>
}
