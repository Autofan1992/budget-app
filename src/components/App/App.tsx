import React, { FC, useState } from 'react'
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap'
import BudgetsList from '../Budgets/BudgetsList'
import { UNCATEGORIZED_BUDGET_ID } from '../../context/budgets-context'
import AddBudgetModal from '../Budgets/AddBudgetModal'
import AddExpenseModal from '../Expenses/AddExpenseModal'
import { BudgetType, ExpensesModalType } from '../../types/types'
import ViewExpensesModal from '../Expenses/ViewExpensesModal'
import ErrorToast from '../common/ErrorToast/ErrorToast'

const App: FC = () => {
    const [showAddBudgetModal, setShowBudgetModal] = useState<boolean>(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false)
    const [showViewExpensesModal, setShowViewExpensesModal] = useState<boolean>(false)
    const [selectedBudget, setSelectedBudget] = useState<Omit<BudgetType, 'max'>>({
        title: UNCATEGORIZED_BUDGET_ID,
        id: UNCATEGORIZED_BUDGET_ID,
    })

    const handleExpensesModalShow = ({ id, title }: Omit<BudgetType, 'max'>, modalToShow: ExpensesModalType) => {
        if (modalToShow === 'addExpense') setShowAddExpenseModal(true)
        if (modalToShow === 'viewExpenses') setShowViewExpensesModal(true)
        setSelectedBudget({ id, title })
    }

    return <div className="wrapper py-3 py-md-4 py-lg-5">
        <ErrorToast/>
        <Container className="d-flex flex-column">
            <Row className="justify-content-center">
                <Col xl={10} xxl={9}>
                    <Row className="mb-5 g-2 align-items-baseline justify-content-between">
                        <Col md="auto">
                            <h1>Budgets</h1>
                        </Col>
                        <Col xs='auto' className='ms-auto'>
                            <ButtonGroup>
                                <Button variant="primary ms-auto" onClick={() => setShowBudgetModal(true)}>Add
                                    Budget</Button>
                                <Button variant="outline-primary" onClick={() => handleExpensesModalShow({
                                    title: UNCATEGORIZED_BUDGET_ID,
                                    id: UNCATEGORIZED_BUDGET_ID,
                                }, 'addExpense')}>Add Expense</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <BudgetsList showExpensesModal={handleExpensesModalShow}/>
                    <AddBudgetModal
                        show={showAddBudgetModal} handleClose={setShowBudgetModal}/>
                    <AddExpenseModal
                        show={showAddExpenseModal} selectedBudget={selectedBudget}
                        handleClose={setShowAddExpenseModal}/>
                    <ViewExpensesModal
                        show={showViewExpensesModal} selectedBudget={selectedBudget}
                        handleClose={setShowViewExpensesModal}/>
                </Col>
            </Row>
        </Container>
    </div>
}

export default App