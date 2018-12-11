export const updateTemplate = (titleIndex, noteIndex, title, text) => ({
    type: 'UPDATE_TEMPLATE',
    titleIndex: titleIndex,
    noteIndex: noteIndex,
    title: title,
    text: text
})

export const removeNote = (titleIndex, noteIndex, title) => ({
    type: 'REMOVE_NOTE',
    titleIndex: titleIndex,
    noteIndex: noteIndex,
    title: title
})

export const removeSection = (titleIndex) => ({
    type: 'REMOVE_SECTION',
    titleIndex: titleIndex
})

export const addNote = (titleIndex, noteIndex, title) => ({
    type: 'ADD_NOTE',
    titleIndex: titleIndex,
    noteIndex: noteIndex,
    title: title
})
export const addNoteFromTitle = (titleIndex, noteIndex, title) => ({
    type: 'ADD_NOTE_FROM_TITLE',
    titleIndex: titleIndex,
    noteIndex: noteIndex,
    title: title
})
