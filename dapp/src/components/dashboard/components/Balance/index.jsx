import React, { useEffect, memo } from 'react'
import { BigNumber } from 'bignumber.js'
import { convertNetworkName } from 'utils/network'
import MainnetLogo from 'images/Mainnet.svg'
import FuseLogo from 'images/fuseLogo.svg'
import { formatWei } from 'utils/format'

const NetworkLogo = memo(({ network }) => {
  if (network === 'fuse') {
    return <div className='network-logo'><img src={FuseLogo} /></div>
  }

  return <div className='network-logo'><img src={MainnetLogo} /></div>
}, (prevProps, nextProps) => {
  if (prevProps.network !== nextProps.network) {
    return false
  }

  return true
})

const Balance = ({
  isAdmin,
  accountAddress,
  bridgeSide,
  symbol,
  balances,
  openModal,
  balance
}) => {
  const { bridge, network } = bridgeSide
  useEffect(() => {
    if (isAdmin) {
      if (bridge === 'home' && Number(new BigNumber(balance).div(1e18).toFixed()) > 0) {
        window.analytics.track({
          userId: accountAddress,
          event: 'Bridge used'
        })
        window.analytics.identify(accountAddress, {
          bridgeWasUsed: true
        })
      } else {
        window.analytics.track({
          userId: accountAddress,
          event: 'Bridge not used'
        })
        window.analytics.identify(accountAddress, {
          bridgeWasUsed: false
        })
      }
    }
    return () => { }
  }, [bridge, balances])

  return (
    <div className='bridge'>
      <NetworkLogo network={network} />
      <div className='bridge__title'>{convertNetworkName(network)}</div>
      <div className='bridge__text'>
        <div>Balance</div>
        <span>{balance ? formatWei(balance, 2) : 0} <small>{symbol}</small>
        </span>
      </div>
      <button className='bridge__more' onClick={openModal}>Show more</button>
    </div>
  )
}

export default Balance
