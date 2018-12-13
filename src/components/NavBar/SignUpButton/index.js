import SignUpButton from './SignUpButton'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showModal } from '../../../actions/signUpAction'

const mapStatToProps = (state) => {
    return {
        titleKey: state.sectionReducer.key
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showModal
    }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(SignUpButton)