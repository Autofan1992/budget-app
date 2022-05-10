import { useRef, useState } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'
import { ExpenseType } from '../../types/types'
import { useBudgets } from '../../context/budgets-context'
import ExpenseItem from './ExpenseItem'

const ExpenseItemContainer = ({ description, amount, id, budgetId }: ExpenseType) => {
    const { editExpense } = useBudgets()
    const listItemRef = useRef<HTMLAnchorElement>(null)
    const [editMode, setEditMode] = useState(false)

    useOutsideClick(listItemRef, setEditMode)

    const handleExpenseDesc = (description: string) => editExpense({
        description,
        amount,
        id
    })

    const handleExpenseAmount = (amount: number) => editExpense({
        description,
        amount,
        id
    })

    return <ExpenseItem
        editMode={editMode}
        setEditMode={setEditMode}
        description={description}
        listItemRef={listItemRef}
        id={id}
        budgetId={budgetId}
        amount={amount}
        handleExpenseAmount={handleExpenseAmount}
        handleExpenseDesc={handleExpenseDesc}
    />
}

export default ExpenseItemContainer