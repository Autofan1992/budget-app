import { createContext, FC, ReactNode, useContext } from 'react'
import { BudgetType, ExpenseType } from '../types/types'
import useLocalStorage from '../hooks/useLocalStorage'
import { v4 as createId } from 'uuid'

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export const BudgetsProvider: FC<ReactNode> = (children) => {
    const [budgets, setBudgets] = useLocalStorage<Array<BudgetType>>('budgets', [])
    const [expenses, setExpenses] = useLocalStorage<Array<ExpenseType>>('expenses', [])
    const getBudgetExpenses = (budgetId: string) => expenses.filter((expense) => expense.budgetId === budgetId)
    const getBudgetExpensesAmount = (budgetId: string) => getBudgetExpenses(budgetId).reduce((acc, expense) => acc + expense.amount, 0)
    const totalExpensesAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0)
    const totalBudgetAmount = budgets.reduce((acc, budget) => acc + budget.max, 0)

    const addExpense = ({ description, amount, budgetId }: Omit<ExpenseType, 'id'>) => {
        setExpenses(prevState => [...prevState, {
            id: createId(),
            description,
            amount,
            budgetId
        }])
    }

    const addBudget = ({ name, max }: Omit<BudgetType, 'id'>) => {
        setBudgets(prevState => {
            if (prevState.find(budget => budget.name === name)) return prevState

            return [...prevState, { id: createId(), name, max }]
        })
    }

    const editBudget = ({ name, max, id }: BudgetType) => {
        setBudgets(prevState => prevState.map(budget => {
            if (budget.id === id) {
                budget.name = name
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
        getBudgetExpensesAmount,
        getBudgetExpenses,
        addExpense,
        editExpense,
        addBudget,
        editBudget,
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
    getBudgetExpensesAmount: (budgetId: string) => number
    totalBudgetAmount: number
    totalExpensesAmount: number
    addExpense: ({ description, amount, budgetId }: Omit<ExpenseType, 'id'>) => void
    editExpense: ({ description, amount, id }: Omit<ExpenseType, 'budgetId'>) => void
    addBudget: ({ name, max }: Omit<BudgetType, 'id'>) => void
    editBudget: ({ name, max, id }: BudgetType) => void
    deleteBudget: (id: string) => void
    deleteExpense: (id: string, budgetId: string) => void
}
