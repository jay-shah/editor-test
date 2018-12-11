import Note from './Note'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addRef } from '../../../actions/noteAction'

const mapStatToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addRef
    }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(Note)