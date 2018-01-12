import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Message from './components/message'

import './styles.css'

import * as actions from '../redux/actions'

const mapStateToProps = (state) => ({ chat: state.chat })
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 1,
      message: ''
    }
  }

  componentWillMount() {
    this.props.openConnection({ id: this.state.id })
  }

  componentWillUnmount() {
    this.props.chat.ws.close()
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  send = () => {
    this.props.chat.ws.send(JSON.stringify({
      sender: 1,
      message: this.state.message,
      date: Date.now()
    }))
    this.setState({ message: ''})
  }

  render() {
    return (
      <div className='parent'>
        <div className='chat-box'>
          <div className='text-area'>
            {
              this.props.chat.messages.map(m => 
                <Message message={m} id={this.state.id} />
              )
            }
          </div>
  
          <div className='input-container'>
            <input
              className='input'
              value={this.state.message}
              name='message'
              onChange={this.onChange}
              placeholder='Say Hi!'
            />
            <a className='button' onClick={this.send}>Send!</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Home