import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux';
import { setChatUser } from '../../Actions/chatActions';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 450,
    },
}));

function UserList(props) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    function handleListItemClick(index, name) {
        props.setChatUser(index, name, props.chat.myId);
        setSelectedIndex(index);
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folder">
                {props.users.map((user, index) => {
                    if (user.id === props.chat.myId) {
                        return null;
                    }
                    return (
                        <div key={user.id}>
                            <ListItem
                                button
                                selected={selectedIndex === user.id}
                                onClick={() => handleListItemClick(user.id, user.display_name)}
                            >
                                <ListItemText primary={user.display_name} />
                            </ListItem>
                            <Divider />
                        </div>
                    )
                })}
            </List>
        </div>
    );
}

const mapStateToProps = state => ({
    chat: state.chat
})

export default connect(mapStateToProps, { setChatUser })(UserList);