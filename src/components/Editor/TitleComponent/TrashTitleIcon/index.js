import TrashTitleIcon from './TrashTitleIcon'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mouseEnterTrashTitleIcon, mouseLeaveTrashTitleIcon } from '../../../../actions/titleAction'

const mapStatToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        mouseEnterTrashTitleIcon,
        mouseLeaveTrashTitleIcon
    }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(TrashTitleIcon)