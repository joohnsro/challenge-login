import React, { Component } from 'react';
import axios from 'axios';

import image from './shutterstock_1220809918 1.jpg';
import './App.css';
import './App-mobile.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, pass } = event.currentTarget;

    axios.get(`https://60313da3081a010017546ef3.mockapi.io/api/users?email=${email.value}`)
      .then( res => {

        const user = res.data.length == 1 && res.data[0].password == pass.value ? res.data[0] : false;
        
        if ( ! user ) {
          alert('Usuário não encontrado.');  
          return;
        }

        alert('Usuário autorizado.');  
        this.setState({ user });
      });
  }

  handleChange(event) {
  
    const elem = event.currentTarget;  
    const {value} = elem;  
    const regex = /\S+@\S+\.\S+/;

    var showMessage = document.getElementById('App-info-error');

    if ( value.length > 3 && !regex.test(value) ) {
      elem.classList.add('App-input-error');
      elem.parentNode.classList.add('App-error');

      if ( typeof(showMessage) == 'undefined' || showMessage == null ) {

        let info = document.createElement('p');
        info.innerText = 'Digite um e-mail válido.';
        info.setAttribute('id','App-info-error');

        elem.parentNode.appendChild(info);
      }
    }    

    if ( value.length > 3 && regex.test(value) ) {

      elem.classList.remove('App-input-error');
      elem.parentNode.classList.remove('App-error');

      let info = document.getElementById("App-info-error");

      if ( typeof(showMessage) != 'undefined' && showMessage != null ) {
        elem.parentNode.removeChild(info);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-image">
          <div className="App-background-effect"></div>
          <img src={image} className="App-background-img" alt="Wiser Educação" />
        </div>
        <div className="App-container">
          <div className="App-content">
            <h2 className="App-title">
              Olá, seja<br />
              bem-vindo!
            </h2>
            <p className="App-subtitle">
              Para acessar a plataforma,
              faça seu login.
            </p>
  
            <form method="get" onSubmit={this.handleSubmit.bind(this)}>
              <div className="App-input-field">
                <label for="email" className="App-label">E-mail</label>
                <input 
                  id="email" name="email" type="email" 
                  className="App-input" placeholder="user.name@mail.com" 
                  required onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="input-field">
                <label for="pass" className="App-label">Senha</label>
                <input 
                  id="pass" name="pass" type="password" 
                  className="App-input" placeholder="*******" 
                  required
                />
              </div>
              <div className="input-field">
                <input type="submit" value="Entrar" className="App-submit" />
              </div>
            </form>
  
            <p className="App-info">
              Esqueceu seu login ou senha?<br />
              Clique <a href="#" className="App-link">aqui</a>
            </p>
  
            <form />
            
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;