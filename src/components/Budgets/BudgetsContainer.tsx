import { Row } from 'react-bootstrap'
import BudgetCard from './BudgetCard'

const BudgetsContainer = () => {

    const getProgressBarVariant = (amount: number, max: number) => {
        const ratio = amount / max
        if (ratio < .5) return 'primary'
        if (ratio < .75) return 'warning'
        return 'danger'
    }

    return <Row className="g-4">
        <BudgetCard name="Food" amount={1100} max={1000} getProgressBarVariant={getProgressBarVariant}/>
    </Row>
}

export default BudgetsContainer