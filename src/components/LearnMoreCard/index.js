import LearnMoreCard from './LearnMoreCard'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { showModal } from '../../actions/signUpAction'

const mapStatToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ showModal }, dispatch);
};

export default connect(mapStatToProps, mapDispatchToProps)(LearnMoreCard)