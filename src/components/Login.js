import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { getForkTsCheckerWebpackPluginHooks } from 'fork-ts-checker-webpack-plugin/lib/hooks'

class Login extends Component {
  state = {
    login: true, //sitch btw login and signup
    email: '',
    password: '',
    name: '',
  }

  render() {
    const { login, email, password, name } = this.state
    return (
      <div className="">
        <h4 className="">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={e => { this.setState({ name: e.target.value }) }}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={e => { this.setState({ email: e.target.value }) }}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={e => { this.setState({ password: e.target.value }) }}
            type="password"
            placeholder="Your password address"
          />
        </div>
        <div className="flex mt3">
          <div
            className="pointer mr2 button"
            onClick={() => this._confirm()}
          >
            {login ? 'login' : 'create account'}
          </div>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to creat an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }
  _confirm = async () => {

  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}




export default Login