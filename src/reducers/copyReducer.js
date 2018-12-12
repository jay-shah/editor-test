const initialState = {
    contentEditable: true,
    clicked: false
}

export const copyReducer = (state = initialState, action) => {

    switch (action.type) {
        case "TOGGLE_CONTENT_EDITABLE":
            return {
                ...state,
                contentEditable: false
            }

        case "UPDATE_COPY_BUTTON_CLICKED":
            return {
                ...state,
                clicked: true
            }

        default:
            return state
    }

}

export default copyReducer