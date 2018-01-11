export function openConnection(payload) {
  return function(dispatch) {
    const ws = new WebSocket(`ws://localhost:3000/?id=${payload.id}`)
    
    ws.onmessage = (e) => {
      const payload = JSON.parse(e.data)

      dispatch({
        type: 'RELOAD_MESSAGES',
        payload: {
          messages: payload.messages
        }
      })
    };

    dispatch({
      type: 'CREATE_WEBSOCKET_COMPLETE',
      payload: {
        ws
      },
    })
  }
}