import Editor from './Editor'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { updateTemplate, removeSection, removeNote, addNote, addNoteFromTitle } from '../../actions/templateActions'



const mapStatToProps = (state) => {
    return {
        inputRef: state.refReducer.inputRef,
        // template: state.templateReducer.templateIds.map(id => state.templateReducer.template[id])
        template: state.templateReducer.template,
        copyButtonClicked: state.copyReducer.clicked
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateTemplate,
        removeSection,
        removeNote,
        addNote,
        addNoteFromTitle
    }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(Editor)