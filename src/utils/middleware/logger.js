const logger = store => next => action => {
    console.group(action.type? action.type: 'Redux_Thunk_Request')
    console.info('dispatching', action.type? action: 'request')
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

export default logger;