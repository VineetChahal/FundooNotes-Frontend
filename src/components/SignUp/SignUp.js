import './SignUp.scss';
import { TextField, Button, Link } from '@mui/material';
import signupImage from '../../images/signupimage.jpg'; 
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate()
    return (
        <>
            <div className='signUp-container'>
                <div className="signUp">
                    <div className="form-section">
                        <span id='logo-name'>Fundoo</span>
                        <span id='content-script'>Create your Fundoo Account</span>

                        <div id='actions'>
                            <TextField id="input-field" label="First Name*" variant="outlined" />
                            <TextField id="input-field" label="Last Name*" variant="outlined" />
                        </div>

                        <div className='username'>
                            <TextField id="input-field" label="Username*" variant="outlined" fullWidth />
                        </div>

                        <div id='password-container'>
                            <TextField className="password-field" label="Password*" variant="outlined" type="password"/>
                            <TextField className="password-field" label="Confirm Password*" variant="outlined" type="password" />
                        </div>

                        <div id='action-buttons'>
                            <Link id='signUp' onClick = {() => navigate('/')} underline='none'>Sign in instead</Link>
                            <Button id='register-button' variant="contained">Register</Button>
                        </div>
                    </div>

                    <div className="image-section">
                        <img src={signupImage} alt="Sign Up Illustration" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
