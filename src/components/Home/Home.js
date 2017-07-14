import React from 'react'
import { Link } from 'react-router-dom'

export default ({ channels, messages, users }) => (
  <div>
    <div>Channels</div>
    <ul>
      {Object.keys(channels).map(channelKey => (
        <li>
          <div><Link to={`/channel/${channelKey}`}>{channels[channelKey].name}</Link> ({Object.keys(users[channelKey]).length})</div>
          <ul>
            {
              (messages[channelKey] ? Object.keys(messages[channelKey]) : []).map(key => (
                <li>{messages[channelKey][key].text}</li>
              ))
            }
          </ul>
        </li>
      ))}
    </ul>
  </div>
)
