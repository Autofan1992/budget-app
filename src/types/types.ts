export type BudgetType = {
    id: string
    name: string
    max: number
}

export type ExpenseType = {
    id: string
    budgetId: string
    amount: number
    description: string
}