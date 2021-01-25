const monitorReducerEnhancer = createStore => (
    reducer,
    initialState,
    enhancer
) => {
    const monitoredReducer = (state, action) => {
        const newState = reducer(state, action)

        return newState
    }

    return createStore(monitoredReducer, initialState, enhancer)
}

export default monitorReducerEnhancer;