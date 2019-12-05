import React, { useEffect, useState } from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';

// General modules
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';

// My modules
import { fetchUsers } from '../../Actions/usersActions';
import { setSelfId } from '../../Actions/chatActions';
import { checkIfLoggedIn, getSelfId, updateSocketId } from '../../Modules/APIGateway';

import { connect } from 'react-redux';

// My components
import UserList from '../../Components/UserList/UserList';
import Chat from '../../Components/Chat/Chat';
import SendMessage from '../../Components/SendMessage/SendMessage';
import AppMenu from '../../Components/AppMenu/AppMenu';

import { fetchMessages } from '../../Actions/chatActions';



const useStyles = makeStyles(theme => ({
    app: {
        marginTop: '40px',
        textAlign: 'center',
    },
    userList: {
        borderRight: '1px solid grey',
        borderBottom: '1px solid grey'
    },
    messages: {
        borderBottom: '1px solid grey'
    },
    flex: {
        display: 'flex',
        flexDirection: 'column-reverse'
    }
}));

let socket;

function Home(props) {

    if (!socket) {
        
        socket = io(':3001');
        socket.on('connect', async () => { 
            let myId = await getSelfId();
            updateSocketId(myId.data.data, socket.id);
        });
        socket.on('newMessage', async (msg) => {
            setRefresh(true);
        })
    }
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (refresh) {
            if (props.chat.id && props.chat.myId) {
                props.fetchMessages(props.chat.id, props.chat.myId);
            }
            setRefresh(false);
        }
    }, [refresh])

    // Material ui hooks
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    useEffect(() => { loginCheck() }, []); // login check

    // Redirect state
    const [toLogin, setToLogin] = useState(false);

    // On socket connection
    useEffect(() => {
        props.fetchUsers();
    }, []); 


    async function loginCheck() {
        let res = await checkIfLoggedIn();
        if (!res) {
            setToLogin(true);
        } else {
            let my_id = await getSelfId();
            props.setSelfId(my_id.data.data);
        }
    }

    return (    
        <Container maxWidth="md">
            {toLogin ? <Redirect to='/Login' /> : null}
            <Fade in timeout={1200}>jjj
                <Paper margin={3} className={classes.app}>
                    <AppMenu />
                    <Grid container className={matches ? null : classes.flex}>
                        <Grid item sm={4} xs={12} className={classes.userList}>
                            <UserList users={props.users}/>
                        </Grid>
                        <Grid item sm={8} xs={12} className={classes.messages}>
                            <Chat />
                        </Grid>
                        <Divider/>
                        <Grid item sm={12}>
                            <SendMessage socket={socket} />
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
        </Container>
    )
}

const mapStateToProps = state => ({
    users: state.users.users,
    chat: state.chat
})

export default connect(mapStateToProps, { fetchUsers, setSelfId, fetchMessages })(Home);