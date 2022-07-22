import { ListGroup, Modal } from 'react-bootstrap'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useBudgets } from '../../context/budgets-context'
import { BudgetType } from '../../types/types'
import ExpenseItem from './ExpenseItem'

const ViewExpensesModal: FC<PropsType> = ({ show, handleClose, selectedBudget }) => {
    const { getBudgetExpenses } = useBudgets()
    const [selectedBudgetName, setBudgetName] = useState<string>()
    const budgetExpenses = getBudgetExpenses(selectedBudget.id)

    useEffect(() => {
        setBudgetName(selectedBudget.title)
        if (budgetExpenses.length < 1) handleClose(false)
    }, [selectedBudget, budgetExpenses, handleClose])

    return <Modal show={show} onHide={() => handleClose(false)}>
        <Modal.Header closeButton>
            <Modal.Title>
                {`${selectedBudgetName} expenses`}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ListGroup>
                {budgetExpenses.map(expense => <ExpenseItem
                    key={expense.id}
                    budgetId={expense.budgetId}
                    id={expense.id}
                    description={expense.description}
                    amount={expense.amount}
                />)}
            </ListGroup>
        </Modal.Body>
    </Modal>
}

export default ViewExpensesModal

type PropsType = {
    selectedBudget: Omit<BudgetType, 'max'>
    show: boolean
    handleClose: Dispatch<SetStateAction<boolean>>
}