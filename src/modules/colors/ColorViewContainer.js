import {connect} from 'react-apollo';
import ColorView from './ColorView';
import gql from 'graphql-tag';

function mapQueriesToProps({ownProps, state}) {
  return {
    stats: {
      query: gql`
        query RootQuery {
          getStats {
            patientTotalCount
            measurePatientCount
            invitationCount
          } 
        }
      `,
      forceFetch: false,
      returnPartialData: true,
    }
  };
}

function mapMutationsToProps({ownProps, state}) {
  return {}
}

const ColorViewWithData = connect({
  mapQueriesToProps,
  mapMutationsToProps
})(ColorView);

export default ColorViewWithData;


