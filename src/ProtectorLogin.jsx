import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const ProtectorLogin = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/openrequests')
    }

    return (
        <div>
            <h2>LOG IN</h2>
            <div className="login-form" onSubmit={(e) => { handleSubmit(e)} }>
                <form>
                    <input className="input-field" onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="USER EMAIL" /><br />
                    <input className="input-field" onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="USER PASSWORD" /><br />
                    <div>
                        <input type="submit" />
                        <button onClick={() => { navigate('/protectorsignup') }}>SIGN UP</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProtectorLogin