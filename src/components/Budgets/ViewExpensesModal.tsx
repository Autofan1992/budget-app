import { ListGroup, Modal } from 'react-bootstrap'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useBudgets } from '../../context/budgets-context'
import { BudgetType } from '../../types/types'
import ExpenseItem from './ExpenseItem'

const ViewExpensesModal: FC<PropsType> = ({ show, handleClose, selectedBudget }) => {
    const handleModalHide = () => handleClose(false)
    const { getBudgetExpenses } = useBudgets()
    const [selectedBudgetName, setBudgetName] = useState<string>()
    const budgetExpenses = getBudgetExpenses(selectedBudget.id)

    useEffect(() => {
        setBudgetName(selectedBudget.name)
        if (budgetExpenses.length < 1) handleModalHide()
    }, [selectedBudget, budgetExpenses])

    return <Modal show={show} onHide={handleModalHide}>
        <Modal.Header closeButton>
            <Modal.Title>
                {selectedBudgetName + ' budget expenses'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ListGroup>
                {budgetExpenses.map(expense => <ExpenseItem
                    key={expense.id} budgetId={expense.budgetId} id={expense.id}
                    description={expense.description}
                    amount={expense.amount}/>)}
            </ListGroup>
        </Modal.Body>
    </Modal>
}

export default ViewExpensesModal

type PropsType = {
    selectedBudget: BudgetType
    show: boolean
    handleClose: Dispatch<SetStateAction<boolean>>
}