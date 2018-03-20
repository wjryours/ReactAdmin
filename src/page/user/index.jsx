import React from 'react'
import {Link} from 'react-router-dom'
import PageTitle from '@/components/page-title/index.jsx'
import Pagination from '@/utils/pagination/index.jsx'
import Utils from '@/utils/index.js'
import User from '@/service/user-service.jsx'

const _Utils = new Utils()
const _User = new User()
class UserList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            pageNum:1,

        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _User.getUserList(this.state.pageNum).then((res)=>{
            this.setState(res)
        }).catch((err)=>{
            _Utils.errorTips(err)
        })
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadUserList()
        })
    }
    render(){
        let listBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        });
        let listError =(
            <tr>
                <td colSpan="5" className="text-center">没有找到相应的结果</td>
            </tr>
        );
        let tableBody = this.state.list.length > 0 ? listBody:listError;
        return(
           <div className="" id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row">
                    <div className="col-md-12">
                       <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户名</th>
                                <th>邮箱</th>
                                <th>电话</th>
                                <th>创建时间</th>
                            </tr>
                        </thead>
                        <tbody>
                             {
                                    tableBody
                             }
                        </tbody>
                       </table>
                    </div>
                </div>
                <Pagination 
                current={this.state.pageNum} total={this.state.total} 
                onChange={(pageNum)=>this.onPageNumChange(pageNum)}
                />
           </div>
        )
    }
}
export default UserList
