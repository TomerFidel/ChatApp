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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Snackbar
import { useSnackbar } from 'notistack';

// React router
import { Link as RouterLink, Redirect } from 'react-router-dom';

// My modules
import { AuthRegister } from '../../Modules/auth';
import { putNewUser, checkIfLoggedIn } from '../../Modules/APIGateway';

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
    },
}));

function Register() {
    // Basic hooks:
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => { loginCheck() }, []); // login check

    // Visual:
    const [showPassword, setShowPassword] = useState(false);


    // Form fields
    const [fields, setFields] = useState({
        username: "",
        password: "",
        displayName: "",
        logMeIn: true
    })

    // Redirects
    const [redirects, setRedirects] = useState({
        home: false,
        login: false
    })


    async function loginCheck() {
        let res = await checkIfLoggedIn();
        if (res) {
            setRedirects({
                ...redirects,
                home: true
            })
        }
    }

    // Add new user
    async function submitUser() {
        const { username, password, displayName, logMeIn } = fields;
        let valid_register = await AuthRegister(username, password, displayName);
        if (!valid_register.valid) {
            enqueueSnackbar(valid_register.error_message, { variant: 'error' });
        } else {
            await putNewUser(username, password, displayName);
            if (logMeIn) {
                setRedirects({
                    ...redirects,
                    home: true
                })
            } else {
                setRedirects({
                    ...redirects,
                    login: true
                })
            }
        }
    }

    return (
        <Container maxWidth="sm">
            {redirects.home ? <Redirect to='/' /> : null}
            {redirects.login ? <Redirect to='/Login/' /> : null}
            <Fade in timeout={1200}>
                <Paper className={classes.loginBox}>
                    <Typography component="h4" variant="h4">
                        Register
                    </Typography>
                    <Avatar className={classes.centered}>R</Avatar>
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
                        onChange={e => setFields({...fields, password: e.target.value})}
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Name for display"
                        value={fields.displayName}
                        onChange={e => setFields({ ...fields, displayName: e.target.value })}
                    />     
                    <FormControlLabel
                        control={
                            <Checkbox checked={fields.logMeIn} onChange={() => setFields({ ...fields, logMeIn: !fields.logMeIn })} value="logMeIn" />
                        }
                        label="Log me in automatically"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        className={classes.button}
                        onClick={submitUser}
                    >
                        Register
                    </Button>
                    <Link component={RouterLink} to="/Login/">
                        Already have an account? login here
                    </Link>
                </Paper>
            </Fade>
        </Container>
    )
}

export default Register;