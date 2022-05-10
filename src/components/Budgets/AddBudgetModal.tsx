import { Button, Form, Modal } from 'react-bootstrap'
import { Dispatch, FC, SetStateAction } from 'react'
import { useBudgets } from '../../context/budgets-context'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { BudgetType } from '../../types/types'

const budgetSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .max(100, 'Title can\'t be longer than 100 characters')
        .min(2, 'Title must have at least 2 characters')
})

const AddBudgetModal: FC<PropsType> = ({ show, handleClose }) => {
    const { addBudget } = useBudgets()

    return <Modal show={show} onHide={() => handleClose(false)}>
        <Modal.Header closeButton>
            <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
                validationSchema={budgetSchema}
                initialValues={{
                    title: '',
                    max: 0
                } as BudgetType}
                onSubmit={({ title, max }, { resetForm, setSubmitting }) => {
                    addBudget({
                        title,
                        max: +max
                    })
                    handleClose(false)
                    resetForm()
                    setSubmitting(false)
                }}
            >
                {({ handleSubmit, touched, errors, handleChange, values }) => <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            className={touched.title && errors.title ? 'is-invalid' : undefined}
                            placeholder="Type budget title"
                            onChange={handleChange}
                            value={values.title}
                            name="title"
                            type="text"
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            className={touched.max && errors.max ? 'is-invalid' : undefined}
                            placeholder="Type budget maximum"
                            onChange={handleChange}
                            value={values.max}
                            name="max"
                            type="number"
                            min={1}
                            step={0.01}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.max}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="text-end">
                        <Button variant="primary" type="submit">Add budget</Button>
                    </div>
                </Form>}
            </Formik>
        </Modal.Body>
    </Modal>
}

export default AddBudgetModal

type PropsType = {
    show: boolean
    handleClose: Dispatch<SetStateAction<boolean>>
}