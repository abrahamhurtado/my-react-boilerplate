import React from 'react';
import { foo } from './module2';
import styles from './index.css';

export default class Header extends React.Component {
  render () {
    return <h1 className={styles.header}>{foo}</h1>
  }
}
