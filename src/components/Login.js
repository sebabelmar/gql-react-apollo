import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!){
    createUser(name: $name, authProvider: { email: { email: $email, password: $password } }){
      id
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!){
    signinUser(email: { email: $email, password: $password }){
      token
    }
  }
`

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
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ name, email, password }}
            onCompleted={data => login ? this._confirm(data) : this.props.history.push('/signup')}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
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
  _confirm = async (data) => {
    const { token } = data.signinUser
    this._saveUserData(token)
    this.props.history.push('/')
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}




export default Login