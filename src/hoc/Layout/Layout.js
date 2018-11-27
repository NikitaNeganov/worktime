import React, { Component } from 'react';
import classes from './Layout.module.css';

import Navigation from '../../components/Navigation/Navigation';

class Layout extends Component {
    render() {
        return(
            <div className={classes.Layout} style={{backgroundColor: '#f4f4f4'}}>
                <Navigation />
                {this.props.children}
            </div>
        );
    }
}

export default Layout;