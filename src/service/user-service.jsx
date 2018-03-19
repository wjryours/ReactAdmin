import Utils from '@/utils/index.js'
const _Utils = new Utils()
class User{
    login(logininfo){
       return  _Utils.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: logininfo
        })
    }
    checkLoginInfo(loginInfo){
        if (typeof loginInfo.username !== 'string' || loginInfo.username=='') {
            return{
                status:false,
                msg:'用户名不能为空'
            }
        }
        if (typeof loginInfo.password !== 'string' || loginInfo.password == '') {
            return {
                status: false,
                msg: '密码不能为空'
            }
        }
        return{
            status: true,
            msg: '验证通过'
        }
    }
    logout() {
        return _Utils.request({
            type: 'post',
            url: '/user/logout.do'
        })
    }
}
export default User