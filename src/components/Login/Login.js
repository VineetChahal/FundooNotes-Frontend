import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { TextField, Button, Link } from '@mui/material';

function Login() {
    const navigate = useNavigate()
    return (
        <>
            <div className='Logincontainer'>
                <div className="login">
                    <span id='logo-name'>Fundoo</span>
                    <span id='sign-in-text'>Sign in</span>
                    <span id='account-text'>Use your Fundoo Account</span>

                    <div className="input-container">
                        <TextField id="input-field" label="Email or phone*" variant="outlined" fullWidth />
                        <TextField id="input-field" label="Password*" variant="outlined" type="password" fullWidth />
                    </div>

                    <Link id="forgot-link" href="#" underline='none'>Forgot password</Link>

                    <div id='actions'>
                        <Link id="create-account" onClick={() => navigate('/signup')} underline='none'>Create account</Link>
                        <Button id="login-button" variant="contained">Login</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
