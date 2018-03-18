import React from 'react'
import { BrowserRouter as Router ,Switch,Route,Link,Redirect} from "react-router-dom"
class TopNav extends React.Component {
    constructor(props){
        super(props)
    }
    onLogout(){
        console.log('123')
    }
    render() {
         return(
            <div>
                <div className="navbar navbar-default top-navbar" >
            <div className="navbar-header">

                <Link className="navbar-brand" to="/"><b>React</b>admin</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">                
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;" >
                        <i className="fa fa-user fa-fw"></i>
                        <span>欢迎admin</span> 
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">

                        <li>
                            <a onClick={()=>{this.onLogout()}}>
                                <i className="fa fa-sign-out fa-fw"></i> 退出
                            </a>
                        </li>
                    </ul>
                   
                </li>
                
            </ul>
        </div>
            </div>
        )
    }
}
export default TopNav