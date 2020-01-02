import React from 'react';

import Action from '../Action/Action'

import styles from './TileItem.module.css';

export default function TileItem({ startTime, endTime, handleSubmit }) {
	const date = startTime.split('T')[0]
	const start = startTime.split('T')[1].slice(0, 5)
	const end = endTime.split('T')[1].slice(0, 5)
	return (
		<li className={styles.row}>
			<div className={styles.text}>
				{`${date} ${start}-${end}`}
			</div>
		<Action type='delete' onClick={handleSubmit} />
		</li>
	)
}