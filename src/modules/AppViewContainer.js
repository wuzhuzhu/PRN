import {connect} from 'react-redux';
import AppView from './AppView';

import _ from 'lodash'

export default connect(
  state => ({
    isReady: _.get(state,'session.isReady'),
    isLoggedIn: _.get(state,'auth.isLoggedIn'),
  })
)(AppView);

