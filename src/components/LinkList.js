import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import LINKS_PER_PAGE from '../constants'

export const FEED_QUERY = gql`
  query SearchQuery($skip: Int, $first: Int) {
    search(skip: $skip, first: $first) {
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

class LinkList extends Component {

  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY })

    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    store.writeQuery({ query: FEED_QUERY, data })
  }

  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes('new')
    const page = parseInt(this.props.match.params.page, 10)

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
    const first = isNewPage ? LINKS_PER_PAGE : 100
    return { first, skip }
  }

  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const linkToRender = data.search

          return (
            <div>
              {linkToRender.map((link, index) => <Link
                key={link.id}
                link={link}
                index={index}
                updateStoreAfterVote={this._updateCacheAfterVote}
              />
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default LinkList