const initialState = {
    contentEditable: true
}

export const copyReducer = (state = initialState, action) => {

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