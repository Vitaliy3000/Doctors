import { connect } from 'react-redux';


export const render = (props) => {
  props.deleteUserData();
  return null;
}

const mapStateToProps = () => Object();

const mapDispatchToProps = dispatch => ({
});


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(render);
