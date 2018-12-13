import Modal from './Modal'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideModal } from '../../actions/signUpAction'

const mapStatToProps = (state) => {
    return {
        show: state.modalReducer.show
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ hideModal }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(Modal)