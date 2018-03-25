// hello world
import React from 'react';
import PageTitle from '@/components/page-title/index.jsx'
import Utils from '@/utils/index.js'
import Product from '@/service/product-service.jsx'
import CategorySelector from '@/page/product/index/category-selector.jsx'

import './save.scss'
const _Utils = new Utils()
const _Product = new Product()
class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.pid,
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            name: '',
            subtitle: '',
            price: '',
            stock: '',
            detail: '',
            status: 1
        }
    }
    componentDidMount() {
        this.loadProduct()
    }
    loadProduct() {
        if (this.state.id) {
            _Product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                
                this.setState(res);
            }, (errMsg) => {
                _Utils.errorTips(errMsg);
            });
        }
    }
    
    render() {

        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"></PageTitle>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品名称</label>
                        <div className="col-sm-5">
                            <p className="form-cotrol-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品描述</label>
                        <div className="col-sm-5">
                            <p className="form-cotrol-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">所属分类</label>

                        <CategorySelector
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                           >
                        </CategorySelector>

                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品价格</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    name="price"
                                    value={this.state.price}
                                   readOnly/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品库存</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    name="stock"
                                    value={this.state.stock}
                                    readOnly/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品图片</label>
                        <div className="col-sm-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map((image, index) =>
                                    (<div className="img-con" key={index} >
                                        
                                        <img src={image.url} />
                                    </div>
                                    )
                                ) : <div>暂无图片</div>
                            }
                        </div>
                        <div className="col-sm-10 col-sm-offset-2 upload-con">
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品详情</label>
                        <div className="col-sm-10" dangerouslySetInnerHTML={{__html:this.state.detail}} >
                           
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default ProductDetail
