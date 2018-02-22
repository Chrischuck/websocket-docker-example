import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Message from './components/message'

import './styles.css'

import * as actions from '../redux/actions'

const mapStateToProps = (state) => ({ chat: state.chat })
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
//add auto scroll to bottom
@connect(mapStateToProps, mapDispatchToProps)
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  componentWillMount() {
    this.props.openConnection({ id: this.props.chat.id })
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.chat.ws.close()
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  scrollToBottom = () => {
    if (this.textArea) {
      this.textArea.scrollTop = this.textArea.scrollHeight;
    }
  }

  send = () => {
    if (this.state.message) {
      this.props.chat.ws.send(JSON.stringify({
        sender: this.props.chat.id,
        message: this.state.message,
        createdAt: Date.now()
      }))
      this.setState({ message: ''})
    }
  }

  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      this.send()
    }
  }

  render() {
    const { id } = this.props.chat
    return (
      <div className='parent'>
        <h2 style={{marginBottom: '0px'}}>You are user {id}</h2>
        <h2 style={{marginTop: '5px'}}>You are now chatting with user {id % 2 === 0 ? id + 1 : id - 1}</h2>
        <div className='chat-box'>
          <div className='text-area' ref={element => { this.textArea = element }}>
            {
              this.props.chat.messages.map(m => 
                <Message message={m} id={this.props.chat.id} />
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
              onKeyPress={this.handleKeyPress}
            />
            <a className='button' onClick={this.send}>Send!</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Home