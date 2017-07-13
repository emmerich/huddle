import React from 'react'

export default ({ channels }) => <div>Channels: {channels.map(c => <div>{c.name}</div>)}</div>
