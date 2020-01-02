import React from 'react';
import { NavLink } from 'react-router-dom';

import HeaderItem from '../HeaderItem/HeaderItem';

import styles from './Header.module.css';

const links = [
		// {url: '/authorization', text: 'Авторизация'},
		{url: '/appointment/department', text: 'Записатьcя'},
		{url: '/appointments', text: 'Мои записи'},
		{url: '/help', text: 'Помощь', active: true},
		// {url: '/exit', text: 'Выход'},
];

export default function header() {
	return (
		<div className={styles.board}>
			{links.map((link, index) =>
				<NavLink key={index} to={link['url']} className={styles.link} activeClassName={styles.activeItem}> 
					<HeaderItem key={index} text={link['text']} />
				</NavLink>)}
		</div>
	)
}