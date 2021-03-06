import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './LinkList'


const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!){
    createLink(url: $url, description: $description){
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }      
      votes {
        id        
      }
    }
  }
`

class CreateLink extends Component {

  state = {
    description: '',
    url: ''
  }

  // form that on submit shoots a mutatation to the back end

  render() {
    const { description, url } = this.state

    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A desc for your link'
          />
        </div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type='text'
            placeholder='Your url!'
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push('/')}
          update={(store, { data: { createLink } }) => {
            const data = store.readQuery({ query: FEED_QUERY })
            data.feed.links.unshift(createLink)
            store.writeQuery({
              query: FEED_QUERY,
              data
            })
          }}
        >
          {postMutation => <button onClick={postMutation} >Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateLink