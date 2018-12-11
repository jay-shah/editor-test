const initialState = {
    inputRef: {}
}

export const refReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_REF':
            return {
                ...state,
                ...state.inputRef[action.ref] = action.data
            }
        default:
            return state
    }
}

export default refReducer