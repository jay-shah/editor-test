import Modal from './Modal'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateCopyButtonClicked } from '../../actions/copyActions'

const mapStatToProps = (state) => {
    return {
        show: state.modalReducer.show
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(Modal)