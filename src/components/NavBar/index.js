import NavBar from './NavBar'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

const mapStatToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(NavBar)