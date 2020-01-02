import React from 'react';

import styles from './HeaderItem.module.css';


export default function header( { text } ) {
	return (
		<div className={styles.item}>
			<div className={styles.text}>
				{text}
			</div>
		</div>
	)
}
