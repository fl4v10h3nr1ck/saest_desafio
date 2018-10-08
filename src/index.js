import React 											from 'react';
import ReactDOM 										from 'react-dom';
import { Provider } 									from 'react-redux';
import { createStore, compose, applyMiddleware } 		from 'redux';
import { sessionService } 								from 'redux-react-session';
import thunkMiddleware 									from 'redux-thunk';
import { Reducers } 									from './reducers';
import App 												from './containers/App';
import * as serviceWorker 								from './serviceWorker';
import 													'bootstrap/dist/css/bootstrap.min.css';
import 													'./styles/geral.css';

const store = createStore(Reducers, undefined, compose(applyMiddleware(thunkMiddleware)));

sessionService.initSessionService(store);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));

serviceWorker.unregister();


