import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Button.module.css';


export default function button({ type, children, onClick, to }) {
  const button = (
    <button onClick={onClick} className={styles.button} type={type}>
			{children}
		</button>
  )
  return to ? <Link to={to}>{button}</Link> : button;
}