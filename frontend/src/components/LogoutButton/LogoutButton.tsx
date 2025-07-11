import './LogoutButton.css'
import { useAuth0 } from "@auth0/auth0-react";

function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <button tabIndex={2} className='logout-button' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><strong>Logout</strong></button>
    );
}

export default LogoutButton;