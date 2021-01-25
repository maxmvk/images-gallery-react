import {applyMiddleware, createStore, compose} from 'redux';
import loggerMiddleware from '../utils/middleware/logger';
import monitorReducerEnhancer from '../utils/enhancers/monitorReducer';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)

const store = createStore(
    rootReducer,
    composedEnhancers
);

export default store;