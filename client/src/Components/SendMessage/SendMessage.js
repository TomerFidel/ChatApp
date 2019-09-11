import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

import { connect } from 'react-redux';

import { pushMessage, getSocketById } from '../../Modules/APIGateway';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '15px 30px',
        display: 'flex'
    },
    input: {
        flexGrow: '1',
    },
    button: {
        padding: '0px 15px',
        backgroundColor: '#3f51b5',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        color: 'white'
    }
}));

function SendMessage(props) {
    const classes = useStyles();

    const [disabled, setDisabled] = useState(true);

    const [message,setMessage] = useState("");

    useEffect(() => {
        if (props.chat.id) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [props.chat.id])

    useEffect(() => {
        
    }, [])

    async function sendNewMessage() {
        if (message !== "") {
            await pushMessage(props.chat.myId, props.chat.id, message);
            let socketId = await getSocketById(props.chat.id);
            socketId = socketId.data.data[0].socket_id;
            props.socket.emit('messageSent', { from: props.chat.myId, to: props.chat.id, socketId: socketId});
            setMessage("");

        }
    }

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            sendNewMessage();
        }
    }

    return (
        <div className={classes.root}>
            <TextField
                label="Message"
                disabled={disabled}
                value={message}
                onKeyDown={keyPress}
                onChange={e => setMessage(e.target.value)}
                placeholder="Send a message"
                className={classes.input}
                variant="outlined"
                fullWidth
            />
            <button disabled={disabled} className={classes.button} onClick={sendNewMessage}><SendIcon /></button>
        </div>
    );
}

const mapStateToProps = state => ({
    chat: state.chat
})

export default connect(mapStateToProps)(SendMessage);