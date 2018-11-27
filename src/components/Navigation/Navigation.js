import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navigation.module.css';

const navigation = (props) => {
    return (
        <div className={classes.Nav}>
            <NavLink exact activeClassName={classes.LinkActive} className={classes.NavLink} to='/home'>Home</NavLink>
            <NavLink activeClassName={classes.LinkActive} className={classes.NavLink} to='/time'>Time</NavLink>
            <NavLink activeClassName={classes.LinkActive} className={classes.NavLink} to='/test'>Test</NavLink>
        </div>
    );
}

export default navigation;