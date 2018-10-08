import { combineReducers } 					from 'redux';
import { sessionReducer } 					from 'redux-react-session';
import { reducer as reduxFormReducer } 		from 'redux-form';

export const Reducers = combineReducers({sessionReducer, form: reduxFormReducer});