import { useNavigate } from "react-router-dom";

const ProtectorSignup = () => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/openrequests')
    }

    return (
        <div>
            <h2>Protector Signup Form</h2>
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <input type="submit" />
            </form>
        </div>
    )

}

export default ProtectorSignup