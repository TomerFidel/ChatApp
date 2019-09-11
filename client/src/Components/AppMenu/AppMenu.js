import React, {useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { logoutFromUser } from '../../Modules/APIGateway';

import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
		display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
		backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: 'auto',
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none', 
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
		width: 200,
		},
	}
}));

export default function AppMenu() {
	const classes = useStyles();

	const[toLogin, setToLogin] = useState(false);

	const logout = async function() {
		await logoutFromUser();
		setToLogin(true);
	}

	return (
		<div className={classes.grow}>
			{toLogin ? <Redirect to="/Login/" /> : null}
			<AppBar position="static">
				<Toolbar>
					{/* <div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search user…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div> Search field will be added soon*/}
					<Typography className={`${classes.title} ${classes.grow}`} variant="h6" noWrap >
						Chat app Testing
					</Typography>
					<Button color="inherit" className={classes.logoutButton} onClick={logout}>Logout</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}