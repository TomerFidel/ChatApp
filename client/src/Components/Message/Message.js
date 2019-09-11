import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1),
    },
    myChip: {
        backgroundColor: '#3f51b5',
        color: 'white'
    },
    you: {
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
}));

function Message(props) {

    const classes = useStyles();

    return (
        <div className={props.from === "You" ? classes.you : null}>
            <Chip label={props.from} className={props.from === "You" ? `${classes.chip} ${classes.myChip}` : classes.chip} />
            <Typography component="span">
                {props.content}
            </Typography>
        </div>
    )
}

export default Message;