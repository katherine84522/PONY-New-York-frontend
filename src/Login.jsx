import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const handleProtector=()=>{
        navigate('/protectorsignup')
    }

    const handleWalker=()=>{
        navigate('/walkersignup')
    }


    return (
        <div>
            <button onClick={() => { handleProtector() }}>Protector</button>
            <button onClick={() => { handleWalker() }}>Walker</button>
        </div>
    )
}

export default Login