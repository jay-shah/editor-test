const initialState = {
    key: null
}

export const sectionReducer = (state = initialState, action) => {

    switch (action.type) {
        case "MOUSE_ENTER_TRASH_TITLE_ICON":
            return {
                ...state,
                key: action.key
            }

        case "MOUSE_LEAVE_TRASH_TITLE_ICON":
            return {
                ...state,
                key: null
            }

        default:
            return state
    }
}

export default sectionReducer