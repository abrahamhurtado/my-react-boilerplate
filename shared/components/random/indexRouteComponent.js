import React from 'react';
import { Link } from 'react-router';

export default class Index extends React.Component {
  render () {
    return (
      <div>
        <Link to='/children'>Go to children route</Link>
        <h2>I'm the index route children!</h2>
      </div>
    );
  }
}
