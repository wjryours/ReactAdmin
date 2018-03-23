import React from 'react';
import './theme.css';
import './index.scss';
import SideNav from '@/components/sidenav/index.jsx';
import TopNav from '@/components/topnav/index.jsx';
class Layout extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
         return(
         <div id="wrapper">
         
                <TopNav/>
                <SideNav/>
                {this.props.children}
        </div>
        )
    }
}
export default Layout