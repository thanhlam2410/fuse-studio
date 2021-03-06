import { Component } from 'react'
import { withNetwork, withAccount, withBox } from 'containers/Web3'
import { connect } from 'react-redux'
import { joinCommunity } from 'actions/communityEntities'
import { withRouter } from 'react-router'

class JoinCommunity extends Component {
  componentDidMount () {
    const { joinCommunity, data, communityAddress } = this.props
    joinCommunity(communityAddress, { ...data, type: 'user' })
  }

  componentDidUpdate (prevProps) {
    if (this.props.isBoxConnected && (!prevProps.join && this.props.join)) {
      window.location.replace(window.location.origin)
    }

    if (this.props.isBoxConnected && (!prevProps.join && this.props.join === false)) {
      window.location.replace(window.location.origin)
    }
  }

  render = () => null
}

const mapStateToProps = (state) => ({
  join: state.screens.communityEntities && state.screens.communityEntities.join
})

const mapDispatchToProps = {
  joinCommunity
}

export default withRouter(withNetwork(withAccount(withBox(connect(mapStateToProps, mapDispatchToProps)(JoinCommunity)))))
