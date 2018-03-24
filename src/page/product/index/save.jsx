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
            categoryId:0,
            parentCategoryId:0,
            subImages:[]
        }
    }
    onCategoryChange(categoryId, parentCategoryId){
        console.log(categoryId, parentCategoryId)
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
            
        })

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
                            <RichEditor onValueChange={(e)=>this.onRichEditorChange(e)}></RichEditor>
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
