import React from 'react'

import './styles.css'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  render() {
    return (
      <div className='parent'>
        <div className='chat-box'>
          <div className='text-area'>


            <div className='text-message my-text'>
              <p className='text'>hello</p>
            </div>
            <div className='text-message other-text'>
                <p className='text'>sup</p>
            </div>
      <div className='text-message my-text'>
              <p className='text'>hello</p>
            </div>

          </div>
  
          <div className='input-container'>
            <input className='input' placeholder='Say Hi!'/>
            <a className='button'>Send!</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Home