import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from './LoadPage.module.css';


const render = () => (<div className={styles.loadPage} ><Spinner animation='border' variant='primary' /></div>)

export default render