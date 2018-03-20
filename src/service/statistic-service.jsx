import Utils from '@/utils/index.js'
const _Utils = new Utils()
class Statistic{
    getHomeCount(){
       return  _Utils.request({
            type: 'get',
            url: '/manage/statistic/base_count.do',
        })
    }
}
export default Statistic