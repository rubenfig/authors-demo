import { connect } from 'react-redux';
import {getAuthors, getPublications} from "../../store/actions/main";
import MainComponent from "./main";

const mapDispatchToProps = dispatch => {
  return {
    getAuthors: () => {
      dispatch(getAuthors());
    },
    getPublications: (params) => {
      dispatch(getPublications(params));
    }
  };
};

const mapStateToProps = (state) => {
  return state.main;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);
