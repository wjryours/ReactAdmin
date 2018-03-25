// hello world
import React from 'react';
import PageTitle from '@/components/page-title/index.jsx'
import Utils from '@/utils/index.js'
import Product from '@/service/product-service.jsx'
import CategorySelector from '@/page/product/index/category-selector.jsx'
import FileUploader from '@/utils/file-uploader/index.jsx'
import RichEditor from "@/utils/rich-editor/index.jsx";
import './save.scss'
const _Utils = new Utils()
const _Product = new Product()
class ProductSave extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.pid,
            categoryId:0,
            parentCategoryId:0,
            subImages:[],
            name:'',
            subtitle:'',
            price:'',
            stock:'',
            detail:'',
            status:1
        }
    }
    componentDidMount(){
        this.loadProduct()
    }
    loadProduct(){
        if (this.state.id) {
            _Product.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => {
                _Utils.errorTips(errMsg);
            });
        }
    }
    onCategoryChange(categoryId, parentCategoryId){
        console.log(categoryId, parentCategoryId)
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId
        });
    }
    onUploadSucess(res){
        let subImages = this.state.subImages
        subImages.push(res)
        this.setState({
            subImages: subImages
        })
    }
    onUploadError(err){
        _Utils.errorTips(err.message||"上传图片失败")
    }
    onImageDelete(e){
        let index = parseInt(e.target.getAttribute('index')) ;
        let subImages =this.state.subImages;
        subImages.splice(index,1)
        this.setState({
            subImages:subImages
        })
    }
    onRichEditorChange(value){
        console.log(value)
        this.setState({
            detail: value
        });

    }
    onValueChange(e){
        let name=e.target.name;
        let value = e.target.value.trim();
        this.setState({
            [name]:value
        })
    }
    getSubImagesString(){
        return this.state.subImages.map((image)=>image.uri).join(',')
    }
    onSubmit(){
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.categoryId),
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status
        }
        let productCheckResult = _Product.checkProduct(product);
        if (this.state.id) {
            product.id = this.state.id;
        }
        // 表单验证成功
        if (productCheckResult.status) {
            _Product.saveProduct(product).then((res) => {
                _Utils.successTips(res);
                this.props.history.push('/product/index');
            }, (errMsg) => {
                _Utils.errorTips(errMsg);
            });
        }
        // 表单验证失败
        else {
            _Utils.errorTips(productCheckResult.msg);
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
                            <input type="text" className="form-control"
                            value={this.state.name}
                            name="name"
                            onChange={(e)=>this.onValueChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label  className="col-sm-2 control-label">商品描述</label>                         
                        <div className="col-sm-5">
                            <input type="text" className="form-control"
                                value={this.state.subtitle} 
                                name="subtitle"
                                onChange={(e) => this.onValueChange(e)} />
                        </div>         
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">所属分类</label>
                        
                            <CategorySelector
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}>
                             </CategorySelector>
                       
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品价格</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    name="price"
                                    value={this.state.price} 
                                    onChange={(e) => this.onValueChange(e)}/>
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
                                    onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">件</span>
                            </div>  
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品图片</label>
                        <div className="col-sm-10">
                        {
                            this.state.subImages.length?this.state.subImages.map((image,index)=>
                            (<div className="img-con" key={index} >
                                    <i className="fa fa-close" index={index} onClick={(e)=>this.onImageDelete(e)} ></i>
                                     <img src={image.url} /> 
                                </div> 
                            )
                        ):<div>上传图片</div> 
                        }
                        </div>
                        <div className="col-sm-10 col-sm-offset-2 upload-con">
                           <FileUploader 
                            onSuccess={(res)=>this.onUploadSucess(res)}
                            onError ={(err)=>this.onUploadError(err)}
                            >

                           </FileUploader>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品详情</label>
                        <div className="col-sm-10">
                            <RichEditor 
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                            onValueChange={(e)=>this.onRichEditorChange(e)}></RichEditor>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary" onClick={(e)=>this.onSubmit(e)} >提交</button>
                        </div>
                    </div>
                 </div>
           </div>
        )
    }
}
export default ProductSave
