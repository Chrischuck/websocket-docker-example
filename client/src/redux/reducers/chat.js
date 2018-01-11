const initialState = {
  ws: null,
  messages: []
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
    
  switch (type) {
    case 'CREATE_WEBSOCKET_COMPLETE':
      return { ...state, ws: payload.ws };
    case 'RELOAD_MESSAGES':
      return { ...state, messages: payload.messages }
    default:
      return state;
  }
}