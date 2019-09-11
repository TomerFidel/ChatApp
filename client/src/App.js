import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { Provider } from 'react-redux';

import store from './Store';
import { SnackbarProvider } from 'notistack';

function App() {

	return (
		<Provider store={store}>
			<SnackbarProvider 
				maxSnack={1}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				autoHideDuration={2000}
				iconVariant={{ error: <i className="fa fa-exclamation-triangle" style={{marginRight: '10px'}}></i>}}>
				<Router>
					<Route exact path='/' component={Home} />
					<Route exact path='/Login/' component={Login} />
					<Route exact path='/Register/' component={Register} />
				</Router>
			</SnackbarProvider>
		</Provider>
	);
}

export default App;
