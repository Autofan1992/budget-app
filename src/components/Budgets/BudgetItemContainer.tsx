import { FC, useRef, useState } from 'react'
import { useBudgets } from '../../context/budgets-context'
import { BudgetType, ExpensesModalType } from '../../types/types'
import useOutsideClick from '../../hooks/useOutsideClick'
import BudgetItem from './BudgetItem'

interface PropsType extends BudgetType {
    amount: number
    getProgressBarVariant: (amount: number, max: number) => string
    showExpensesModal: ({ title, id, max }: BudgetType, modalToShow: ExpensesModalType) => void
}

const BudgetItemContainer: FC<PropsType> = (
    {
        title,
        amount,
        max,
        id,
        getProgressBarVariant,
        showExpensesModal,
    }) => {
    const [editMode, setEditMode] = useState(false)
    const { getBudgetExpensesAmount, editBudget } = useBudgets()
    const budgetExpensesAmount = getBudgetExpensesAmount(id)
    const cardRef = useRef<HTMLDivElement>(null)
    const progressBarVariant = getProgressBarVariant(amount, max)

    useOutsideClick(cardRef, setEditMode)

    const handleModalShow = () => showExpensesModal({
        title,
        id,
        max
    }, 'viewExpenses')

    const handleBudgetTitle = (title: string) => editBudget({
        title,
        id,
        max
    })

    const handleBudgetMax = (max: number) => editBudget({
        title,
        id,
        max
    })

    return <BudgetItem
        id={id}
        amount={amount}
        title={title}
        max={max}
        progressBarVariant={progressBarVariant}
        setEditMode={setEditMode}
        budgetExpensesAmount={budgetExpensesAmount}
        handleBudgetMax={handleBudgetMax}
        cardRef={cardRef}
        handleBudgetTitle={handleBudgetTitle}
        editMode={editMode}
        handleModalShow={handleModalShow}
        showExpensesModal={showExpensesModal}
    />
}

export default BudgetItemContainer