import React, {Component} from 'react';
//import {Button, Input} from 'semantic-ui-react';
import { Input, Icon, Button} from 'antd';
import './App.css';
import io from "socket.io-client";


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: '',
      messages: []
    }

    this.socket = io('http://localhost:8000');

    this.socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({messages: [...this.state.messages, data]});
      console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        message: this.state.message
      })
      this.setState({message: ''});
    }
  }
 
    
  render() {
    return(
      <div>
        <div className ="header">
            <h1>React Chatbot</h1>
        </div>
        
        <div className="chat-window">
          
          <div className="conversation-view">
            {this.state.messages.map((message, index) => {
                return(
                  <div key={index}> 
                    <span className="chat-content">{message.message}</span>
                  </div>
                )
              })}
          </div>

          <div className="message-box">
            <div className="text-input">
              <Input type = "text"
                value= {this.state.message}
                onChange={ev => this.setState({message: ev.target.value})}
                placeholder="질문을 입력하세요."
                
                prefix ={<Icon type = "user"/>}
              />
            </div>
            <div className = "btn">
              <Button 
                onClick={this.sendMessage}

                icon = "right-circle"
                shape = "round"
                >Send
              </Button>
            </div>  
          </div>
        </div>
        
      </div>
      
    );
    
  }
}

export default App;
