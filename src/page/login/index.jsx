import React from "react";
import './index.scss'
import Utils from '@/utils/index.js'
import User from '@/service/user-service.jsx'
const _Utils = new Utils()
const _User = new User()
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            redirect: _Utils.getUrlParam('redirect')||''
        }
    }
    componentWillMount(){
        document.title='登录'
    }
    onInputChange(e){
        let inputName = e.target.name;
        let inputValue= e.target.value;
        this.setState({
            [inputName]: inputValue
        })
    }
    onSumbit(){
        let LoginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        let checkResult = _User.checkLoginInfo(LoginInfo)
        console.log(checkResult)
        if (!checkResult.status) {
            _Utils.errorTips(checkResult.msg)
            return
        }
        _User.login(LoginInfo).then((res)=>{
            _Utils.setStorage('userInfo',res)
            this.props.history.push(this.state.redirect)
        }).catch((err)=>{
            _Utils.errorTips(err)
        })
    }
    onInputKeyup(e){
        if (e.keyCode==13) {
            this.onSumbit()
        }
    }
    render(){
        return( 
       
            <div className="col-md-4 col-md-offset-4 ">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登陆</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">                           
                                <input type="text" 
                                    name='username'
                                    onKeyUp={(e) => this.onInputKeyup(e)}
                                onChange={(e) => this.onInputChange(e)}
                                className="form-control" placeholder="用户名"/>
                             </div>
                                <div className="form-group">
                                <input type="password"
                                    name='password'
                                    onKeyUp={(e)=>this.onInputKeyup(e)}
                                onChange={(e) => this.onInputChange(e)}
                                     className="form-control"  placeholder="密码"/>
                                 </div>                      
                                <button  onClick={(e)=>this.onSumbit(e)}
                                className="btn btn-primary btn-block">登陆</button>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
}
export default Login