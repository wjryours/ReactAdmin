import React from 'react'
import {Link,NavLink} from 'react-router-dom'
class SideNav extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
         return(
           <div className="navbar-default navbar-side" >
            <div className="sidebar-collapse">
                <ul className="nav" >

                    <li>
                        <NavLink exact activeClassName="active-menu" to="/" ><i className="fa fa-home"></i> 首页</NavLink>
                    </li>
                    <li className="active">
                             <Link to="/">
                                <i className="fa fa-list"></i> 商品<span className="fa arrow"></span>
                             </Link>
                        <ul className="nav nav-second-level">
                            <li>
                                <NavLink activeClassName="active-menu" to="/product">商品管理</NavLink>
                            </li>
                            <li>
                                     <NavLink activeClassName="active-menu" to="/product-category/index">品类管理</NavLink>
                            </li>
                        </ul>
                    </li>
                    
                    <li className="active">
                             <Link to="/order">
                                <i className="fa fa-check-square-o"></i> 订单<span className="fa arrow"></span>
                             </Link>
                        <ul className="nav nav-second-level">
                            <li>
                                <NavLink activeClassName="active-menu" to="/order">订单管理</NavLink>
                            </li>
                            
                        </ul>
                    </li>
                         <li className="active">
                             <Link to="/user">
                                 <i className="fa fa-user-o"></i> 用户<span className="fa arrow"></span>
                             </Link>
                             <ul className="nav nav-second-level">
                                 <li>
                                     <NavLink activeClassName="active-menu" to="/user">用户管理</NavLink>
                                 </li>

                             </ul>
                         </li>
                </ul>

            </div>

        </div>
        )
    }
}
export default SideNav