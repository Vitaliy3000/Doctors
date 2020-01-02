import React from 'react';

import styles from './Tile.module.css';

import Action from '../Action/Action'

import TileItem from '../TileItem/TileItem';


export default function tile({ appointments, handleDelete, handleDeleteItem }) {
	console.log('appointments tile:', appointments)
	const metaDoctor = appointments[0].doctor.mainDoctor;
	return (
		<li className={styles.tile}>
			<h3>{metaDoctor.specialityName}</h3>
			<div className={styles.header}>
				<h4>{metaDoctor.firstName + '\t' + metaDoctor.lastName}</h4>
				<Action type='delete' onClick={handleDelete} />
			</div>
			<ul className={styles.list}>
				{appointments.map(record => 
					<TileItem
						key={record.appointmentId}
						{...record}
						handleSubmit={() => handleDeleteItem(record.appointmentId)} 
					/>
				)}
			</ul>
		</li>
	);
}