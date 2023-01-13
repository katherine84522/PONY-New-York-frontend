import { useNavigate } from "react-router-dom";

const WalkerSignup = () => {

    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/requestform')
    }

    return (
        <div>
            <h2>Walker Signup Form</h2>
            <form onSubmit={() => { handleSubmit() }}>
                <input type="submit" />
            </form>
        </div>
    )


}

export default WalkerSignup