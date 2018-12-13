import Title from './Title'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addRef } from '../../../../actions/titleAction'

const mapStatToProps = (state) => {
    return {
        titleKey: state.sectionReducer.key,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addRef
    }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(Title)