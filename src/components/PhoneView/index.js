import PhoneView from './PhoneView'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

const mapStatToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(PhoneView)
