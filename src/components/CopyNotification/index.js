import CopyNotification from './CopyNotification'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

const mapStatToProps = (state) => {
    return {
        copyButtonClicked: state.copyReducer.clicked
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(CopyNotification)