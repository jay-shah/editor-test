const defaultState = {
    contentEditable: true
}

export const copyReducer = (state = defaultState, action) => {

    switch (action.type) {
        case "TOGGLE_CONTENT_EDITABLE":
            return {
                ...state,
                contentEditable: false
            }

        default:
            return state
    }

}

export default copyReducer