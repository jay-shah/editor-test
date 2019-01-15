import CopyButton from './CopyButton'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateCopyButtonClicked } from '../../actions/copyActions'

const mapStatToProps = (state) => {
    return {
        template: state.templateReducer.template,
        uuid: state.updateUUIDReducer.uuid,
        ipAddr: state.updateIPAddrReducer.ipAddr
    }

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateCopyButtonClicked,
    }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(CopyButton)