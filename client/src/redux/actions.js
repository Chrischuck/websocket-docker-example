export function openConnection(payload) {
  return async function(dispatch) {
    let id = null

    if (!payload.id) {
      id = await fetch('http://localhost:5006/id').then(res => res.json())
      //localStorage.setItem('id', id.id)
      dispatch({
        type: 'FETCH_ID_SUCCESS',
        payload: id
      })
    }
    const ws = new WebSocket(`ws://localhost:5006/?id=${id ? id.id : payload.id}`)
    
    ws.onmessage = (e) => {
      const payload = JSON.parse(e.data)
      dispatch({
        type: 'RELOAD_MESSAGES',
        payload: {
          messages: payload.data
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