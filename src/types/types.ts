export type BudgetType = {
    id: string
    title: string
    max: number
}

export type ExpenseType = {
    id: string
    budgetId: string
    amount: number
    description: string
}

export type ExpensesModalType = 'addExpense' | 'viewExpenses'