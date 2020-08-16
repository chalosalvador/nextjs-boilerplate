import { LOGIN_ACTION, LOGOUT_ACTION } from '../constants/actions';

/**
 * Created by chalosalvador on 2/6/20
 */
const authReducer = ( state, action ) => {

  switch( action.type ) {
    case LOGIN_ACTION:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
