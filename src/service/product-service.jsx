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
    getCategoryList(parentCategoryId){
        return _Utils.request({
            type: 'get',
            url: '/manage/category/get_category.do',
            data: { categoryId:parentCategoryId||0}
        })
    }
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证通过'
        };
        // 判断用户名为空
        if (typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        // 判断描述不能为空
        if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 验证品类ID
        if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格为数字，且大于0
        if (typeof product.price !== 'number' || !(product.price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }

        return result;
    }
    saveProduct(product){
        return _Utils.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: product
        });
    }
    getProduct(productId) {
        return _Utils.request({
            type: 'post',
            url: '/manage/product/detail.do',
            data: {
                productId: productId || 0
            }
        });
    }
    // 根据父品类id获取品类列表
    getCategoryList(parentCategoryId) {
        return _Utils.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        });
    }
    // 新增品类
    saveCategory(category) {
        return _Utils.request({
            type: 'post',
            url: '/manage/category/add_category.do',
            data: category
        });
    }
    // 修改品类名称
    updateCategoryName(category) {
        return _Utils.request({
            type: 'post',
            url: '/manage/category/set_category_name.do',
            data: category
        });
    }
}
export default Product