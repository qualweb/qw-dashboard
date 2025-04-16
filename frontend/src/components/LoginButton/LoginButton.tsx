import './LoginButton.css'
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <button className='login-register-button' onClick={() => loginWithRedirect()} ><strong>Login / Register</strong></button>
    );
}

export default LoginButton;