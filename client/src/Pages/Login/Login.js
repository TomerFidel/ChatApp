import React, { useState, useEffect } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Snackbar
import { useSnackbar } from 'notistack';

// React router
import { Link as RouterLink, Redirect } from 'react-router-dom';

// My modules
import { authLogin } from '../../Modules/auth';
import { checkIfLoggedIn } from '../../Modules/APIGateway';

// Component styles
const useStyles = makeStyles(theme => ({
    loginBox: {
        marginTop: '40px',
        padding: '20px',
        textAlign: 'center'
    },
    centered: {
        margin: '12px auto'
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

function Login() {
    // basic hooks
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => { loginCheck() }, []); // login check

    // Visuals
    const [showPassword, setShowPassword] = useState(false);

    // Form fields
    const [fields, setFields] = useState({
        username: "",
        password: ""
    })

    // Redirect
    const [toHome, setToHome] = useState(false);

    // Login user
    const submitLogin = async () => {
        const {username, password} = fields;
        let valid_login = await authLogin(username, password);

        if (!valid_login.valid) {
            enqueueSnackbar(valid_login.error_message, { variant: 'error' });
        } else {
            setToHome(true);
        }
    }

    async function loginCheck() {
        let res = await checkIfLoggedIn();
        if (res) {
            setToHome(true);
        }
    }

    return (
        <Container maxWidth="sm">
            {toHome ? <Redirect to='/' /> : null}
            <Fade in timeout={1200}>
                <Paper className={classes.loginBox}>
                    <Typography component="h4" variant="h4">
                        Sign in
                    </Typography>
                    <Avatar className={classes.centered}>S</Avatar>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Username"
                        autoFocus
                        value={fields.username}
                        onChange={e => setFields({ ...fields, username: e.target.value })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        value={fields.password}
                        onChange={e => setFields({ ...fields, password: e.target.value })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.button}
                        onClick={submitLogin}
                    >
                        Login
                    </Button>
                    <Link component={RouterLink} to="/Register/">
                        No account? register here
                    </Link>
                </Paper>
            </Fade>
        </Container>
    )
}

export default Login;