import Utils from '@/utils/index.js'
const _Utils = new Utils()
class Product {

    getProductList(listParam) {
        console.log(listParam)
        let Url = ''
        let data = {}
        if (listParam.listType == 'list') {
            Url = '/manage/product/list.do'
            data.pageNum = listParam.pageNum
        } else if (listParam.listType == 'search') {
            Url = '/manage/product/search.do'
            data.pageNum = listParam.pageNum
            data[listParam.searchType] = listParam.searchKeyword
            console.log(data)
        }
        return _Utils.request({
            type: 'post',
            url: Url,
            data:data
        })
    }
    setProductStatus(productInfo){
        return _Utils.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        })
    }
}
export default Product