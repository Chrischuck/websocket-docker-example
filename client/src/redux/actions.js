export function openConnection(payload) {
  return function(dispatch) {
    const ws = new WebSocket(`ws://localhost:3000/?id=${payload.id}`)
    
    ws.onmessage = (e) => {
      const payload = JSON.parse(e.data)
      dispatch({
        type: 'RELOAD_MESSAGES',
        payload: {
          messages: payload.data.map(i => JSON.parse(i))
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