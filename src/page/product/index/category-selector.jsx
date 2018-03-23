// hello world
import React from 'react';
import './category-selector.scss'
import Utils from '@/utils/index.js'
import Product from '@/service/product-service.jsx'
const _Utils = new Utils()
const _Product = new Product()
class CategorySelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstCategoryList:[],
            firstCategoryId:0,
            secondCategoryList:[],
            secondCategoryId:0
        }
    }
    componentDidMount(){
        this.loadFirstCategory()
    }
    loadFirstCategory(){
        _Product.getCategoryList().then((res)=>{
            this.setState({
                firstCategoryList:res
            })
        }).catch((res)=>{
            _Utils.errorTips(res)
        })
    }
    loadSecondCategory(){
        _Product.getCategoryList(this.state.firstCategoryId).then((res) => {
            this.setState({
                secondCategoryList: res
            })
        }).catch((res) => {
            _Utils.errorTips(res)
        })
    }
    onFirstCategoryChange(e){
        let newValue = e.target.value||0
        this.setState({
            firstCategoryId:newValue,
            secondCategoryId:0,
            secondCategoryList:[]
        },()=>{
            this.loadSecondCategory()
            this.onPropsCategoryChange()
        })
    }
    onSecondCategoryChange(e){
        let newValue = e.target.value;
        this.setState({
            secondCategoryId:newValue
        },()=>{
            this.onPropsCategoryChange()
        })
    }
    onPropsCategoryChange(){
        let categoryChangeable = typeof this.props.onCategoryChange ==='function'
        if (this.state.secondCategoryId) {
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
        }else{
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId,0)
        }
    }
    render() {

        return (
            <div className="col-sm-10" >
                <select className="form-control cate-select"
                onChange={(e)=>this.onFirstCategoryChange(e)} >
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category,index)=>
                            <option value={category.id} key={index}>{category.name}</option>
                    )
                    }
                </select>
                {
                    this.state.secondCategoryList.length ? 
                    <select className="form-control cate-select" onChange={(e)=>this.onSecondCategoryChange(e)} >
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCategoryList.map((category, index) =>
                                <option value={category.id} key={index}>{category.name}</option>
                            )
                        }
                    </select>:null
                }
                
            </div>
        )
    }
}
export default CategorySelector
