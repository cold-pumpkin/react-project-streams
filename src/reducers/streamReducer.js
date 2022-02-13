import _ from 'lodash';
import { 
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/types.js';

const streamReducer =  (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      // _.mapKeys(payload, 'id') : list 안의 데이터를 id를 키로 갖는 map 형태로 변환
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
      // key interpolation으로 간결하게
      return { ...state, [action.payload.id]: action.payload }; 
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload); // action creator 에서 payload가 key
    default:
      return state;
  }
};

export default streamReducer;