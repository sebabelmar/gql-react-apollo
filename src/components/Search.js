import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'


const FEED_SEARCH_QUERY = gql`
  query Search($filter: String!) {
    search(filter: { descriptionContains: $filter, OR: { urlContains: $filter } }) {
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
        user {
          id
        }
      }
    }
  }
`

class Search extends Component {

  state = {
    links: [],
    filter: ''
  }

  render() {
    return (
      <div>
        <div>
          Search
        <input
            type='text'
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button onClick={() => this._executeSearch()}>OK</button>
        </div>
        {
          this.state.links.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))
        }
      </div>
    )
  }

  _executeSearch = async () => {
    const { filter } = this.state 
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    })
    const links = result.data.search
    this.setState({ links })
  }
}

export default withApollo(Search)