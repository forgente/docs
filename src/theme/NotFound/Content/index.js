import React from 'react';
import Content from '@theme-original/NotFound/Content';
import styles from './styles.module.css';

export default function ContentWrapper(props) {
  return (
    <>
      <Content {...props} />
      <div className={styles.links}>
        <a href="/">Browse the latest docs</a>
        <span className={styles.separator}/>
        <a href="/next">Access next docs</a>
      </div>
    </>
  );
}
