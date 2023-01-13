import { useNavigate } from 'react-router-dom'
import WalkerNavBar from './WalkerNavBar'

const RequestForm = () => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/walkerongoingrequest')
    }
    return (
        <>
            < WalkerNavBar />
            <div>
                <h2>Request a Protector</h2>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input type="submit" />
                </form>
            </div>
        </>
    )
}

export default RequestForm