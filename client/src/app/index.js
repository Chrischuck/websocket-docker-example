import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.css'

import * as actions from '../redux/actions'

const mapStateToProps = (state) => ({ chat: state.chat })
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  componentWillMount() {
    this.props.openConnection({ id: 1 })
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
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
            <input className='input' name='message' onChange={this.onChange} placeholder='Say Hi!'/>
            <a className='button'>Send!</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Home