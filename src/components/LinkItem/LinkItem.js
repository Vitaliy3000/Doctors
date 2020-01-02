import React from 'react';

import styles from './LinkItem.module.css';


export default function link({ text }) {
	return (
		<li className={styles.row}>
			<div className={styles.text}>
				{text}
			</div>
		</li>
	)
}