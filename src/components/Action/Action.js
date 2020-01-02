import React from 'react';

import styles from './Action.module.css';


export default function action({ type, onClick }) {
  if (type === 'delete') {
    return <div className={styles.text} onClick={onClick} >&#65794;</div>;
  }
  return null;
}