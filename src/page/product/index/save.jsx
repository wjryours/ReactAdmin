// hello world
import React from 'react';
import PageTitle from '@/components/page-title/index.jsx'
import Utils from '@/utils/index.js'
import Product from '@/service/product-service.jsx'
import CategorySelector from '@/page/product/index/category-selector.jsx'
const _Utils = new Utils()
const _Product = new Product()
class ProductSave extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categoryId:0,
            parentCategoryId:0
        }
    }
    onCategoryChange(categoryId, parentCategoryId){
        console.log(categoryId, parentCategoryId)
    }
    render() {

        return (
           <div id="page-wrapper">
                <PageTitle title="添加商品"></PageTitle>
                <div className="form-horizontal">
                    <div className="form-group"> 
                            <label className="col-sm-2 control-label">商品名称</label>                   
                            <div className="col-sm-5">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-sm-2 control-label">商品描述</label>                         
                        <div className="col-sm-5">
                            <input type="text" className="form-control"  />
                        </div>         
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">所属分类</label>
                        
                            <CategorySelector
                            onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}>
                             </CategorySelector>
                       
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品价格</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control" />
                                <span className="input-group-addon">元</span>
                            </div>  
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品库存</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control" />
                                <span className="input-group-addon">件</span>
                            </div>  
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品图片</label>
                        <div className="col-sm-10">
                           
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品详情</label>
                        <div className="col-sm-10">
                           
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary">提交</button>
                        </div>
                    </div>
                 </div>
           </div>
        )
    }
}
export default ProductSave
