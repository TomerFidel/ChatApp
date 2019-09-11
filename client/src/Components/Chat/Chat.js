import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Message from '../Message/Message';

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'left' ,
        position: 'relative',
        overflow: 'auto',
        minHeight: 450,
        maxHeight: 450,
        backgroundColor: '#ffffff',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23a1a1a1' fill-opacity='0.16'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`
    },
    chip: {
        margin: theme.spacing(1),
    },
    myChip: {
        backgroundColor: '#3f51b5',
        color: 'white'
    },
    other: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
}));

function Chat(props) {
    const classes = useStyles();
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    });

    return (
        <div className={classes.root}>
            {
                props.chat.messages.map(msg => {
                    let from = msg.from_id === props.chat.myId ? "You" : props.chat.name;
                    return <Message key={msg.id} from={from} content={msg.message} />
                })
            }
            <div ref={messagesEndRef}></div>
        </div>
    )
}

const mapStateToProps = state => ({
    chat: state.chat
})

export default connect(mapStateToProps)(Chat);