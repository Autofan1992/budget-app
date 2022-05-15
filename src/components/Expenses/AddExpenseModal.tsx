import { Button, Form, Modal } from 'react-bootstrap'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../../context/budgets-context'
import { BudgetType, ExpenseType } from '../../types/types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Omit } from 'react-bootstrap/helpers'

const expenseSchema = Yup.object().shape({
    description: Yup.string()
        .required('Description is required')
        .max(200, 'Description can\'t be longer than 200 characters')
        .min(2, 'Description must have at least 2 characters')
})

const AddExpenseModal: FC<PropsType> = ({ show, handleClose, selectedBudget }) => {
    const handleModalHide = () => handleClose(false)
    const { addExpense, budgets } = useBudgets()
    const [selectedBudgetName, setBudgetName] = useState<string>()

    useEffect(() => {
        setBudgetName(selectedBudget.title)
    }, [selectedBudget])

    return <Modal show={show} onHide={handleModalHide}>
        <Modal.Header closeButton>
            <Modal.Title>{selectedBudgetName === UNCATEGORIZED_BUDGET_ID ? 'New expense' : 'Add Expense to ' + selectedBudgetName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                validationSchema={expenseSchema}
                initialValues={{
                    description: '',
                    amount: 0,
                    budgetId: selectedBudget.id,
                } as Omit<ExpenseType, 'id'>}
                onSubmit={({ budgetId, amount, description }, { resetForm, setSubmitting }) => {
                    addExpense({
                        description,
                        amount,
                        budgetId
                    })
                    handleClose(false)
                    resetForm()
                    setSubmitting(false)
                }}
            >
                {({ handleSubmit, touched, errors, handleChange, values }) => <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            className={touched.description && errors.description ? 'is-invalid' : undefined}
                            placeholder="Type budget description"
                            onChange={handleChange}
                            value={values.description}
                            name="description"
                            type="text"
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            className={touched.amount && errors.amount ? 'is-invalid' : undefined}
                            placeholder="Type expense amount"
                            onChange={handleChange}
                            value={values.amount}
                            name="amount"
                            type="number"
                            min={1}
                            step={0.01}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select onChange={handleChange} name='budgetTitle' defaultValue={selectedBudget.id}>
                            <option value={UNCATEGORIZED_BUDGET_ID}>{UNCATEGORIZED_BUDGET_ID}</option>
                            {budgets.map(budget => <option key={budget.id} value={budget.id}>{budget.title}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <div className="text-end">
                        <Button variant="primary" type="submit">Add Expense</Button>
                    </div>
                </Form>}
            </Formik>
        </Modal.Body>
    </Modal>
}

export default AddExpenseModal

type PropsType = {
    selectedBudget: Omit<BudgetType, 'max'>
    show: boolean
    handleClose: Dispatch<SetStateAction<boolean>>
}