import Section from './Section'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStatToProps = (state) => {
    return {
        titleKey: state.sectionReducer.key
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({});
};

export default connect(mapStatToProps, mapDispatchToProps)(Section)