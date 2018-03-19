import React from 'react'
import { BrowserRouter as Router ,Switch,Route,Link,Redirect} from "react-router-dom"
import Utils from '@/utils/index.js'
import User from '@/service/user-service.jsx'
const _Utils = new Utils()
const _User = new User()
class TopNav extends React.Component {
    constructor(props){
        super(props)
        this.state={
            username: _Utils.getStorage('userInfo').username||''
        }
    }
    onLogout(){
        _User.logout().then((res)=>{
            _Utils.removeStorage('userInfo')
            window.location.href= '/login'
        }).catch((err)=>{
            _Utils.errorTips(err)
        })
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
                                 <span>欢迎{this.state.username}</span> 
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