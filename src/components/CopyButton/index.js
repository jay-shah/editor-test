import CopyButton from './CopyButton'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateCopyButtonClicked } from '../../actions/copyActions'

const mapStatToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateCopyButtonClicked
    }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(CopyButton)