import React from 'react';
import styles from './Card.module.css';

const Card = props => {
    return (
        <div className={`${styles.Card} card`}>
            <div className="card-body">
                <h5 className="card-title"> {props.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted"><span>{props.stargazers} Stargazers</span> &nbsp; <span>{props.watcher} People Watching</span></h6>
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    );
};

export default Card;