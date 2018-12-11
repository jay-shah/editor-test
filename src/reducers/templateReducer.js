import template from '../data/template.json'
import { updateTemplate } from '../actions/templateActions.js'
import { updates, updateAt, ops } from 'fn-update'


const initialState = {
    template: template,
    // template: Object.assign({}, ...template),
    // templateIds: template.map(x => Object.keys(x)[0])
}


export const templateReducer = (state = initialState, action) => {



    switch (action.type) {

        case "UPDATE_TEMPLATE":

            return updateAt(
                ['template', action.titleIndex, action.title, action.noteIndex],
                action.text
            )(state)

        case "REMOVE_NOTE":

            return updateAt(
                ['template', action.titleIndex, action.title, action.noteIndex],
                ops.delete
            )(state)




        // return {
        //     ...state,
        //     template: [
        //         ...state.template.slice(0, action.titleIndex),
        //         {
        //             ...state.template[action.titleIndex],
        //             [action.title]: state.template[action.titleIndex][action.title].filter((x, i) => i !== action.noteIndex)
        //         },
        //         ...state.template.slice(action.titleIndex + 1)
        //     ]
        // }


        case "REMOVE_SECTION":

            return {
                ...state,
                template: [
                    ...state.template.slice(0, action.titleIndex),
                    ...state.template.slice(action.titleIndex + 1)
                ]
            }

        // template: state.template.filter((item, index) => index !== action.titleIndex)


        case "ADD_NOTE":

            return {
                ...state,
                template: [
                    ...state.template.slice(0, action.titleIndex),
                    {
                        ...state.template[action.titleIndex],
                        [action.title]: [
                            ...state.template[action.titleIndex][action.title].slice(0, action.noteIndex + 1),
                            ' ',
                            ...state.template[action.titleIndex][action.title].slice(action.noteIndex + 1)
                        ]

                    },
                    ...state.template.slice(action.titleIndex + 1)
                ]
            }

        case 'ADD_NOTE_FROM_TITLE':
            return {
                ...state,
                template: [
                    ...state.template.slice(0, action.titleIndex),
                    {
                        ...state.template[action.titleIndex],
                        [action.title]: [
                            ...state.template[action.titleIndex][action.title].slice(0, 0),
                            ' ',
                            ...state.template[action.titleIndex][action.title].slice(0)
                        ]
                    },
                    ...state.template.slice(action.titleIndex + 1)
                ]
            }

        default:
            return state

    }

}

export default templateReducer;