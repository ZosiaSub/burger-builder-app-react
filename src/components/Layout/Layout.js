import React, { PureComponent } from 'react';
import Aux from '../../hoc/Wrapper';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends PureComponent {
    state = {
        sideDrawerOpen: false
    }

    sideDrawerToggleHander = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    }

    render () {
        return (
            <Aux>
                <SideDrawer 
                    open={this.state.sideDrawerOpen}
                    closed={this.sideDrawerToggleHander}
                />
                    <Toolbar openSideDrawer={this.sideDrawerToggleHander} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>        
            </Aux>
        )  
    }       
}

export default Layout;
