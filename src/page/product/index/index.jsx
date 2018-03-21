// hello world
import React from 'react';

import { Link } from "react-router-dom"


import PageTitle from '@/components/page-title/index.jsx'
import Pagination from '@/utils/pagination/index.jsx'
import Utils from '@/utils/index.js'
import Product from '@/service/product-service.jsx'
import TableList from "@/utils/table-list/index.jsx"
import ListSearch from './index-list-search.jsx'
import './index.scss'
const _Utils = new Utils()
const _Product = new Product()
class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType:'list'
        }
    }
    componentDidMount() {
        this.loadProductList()
    }
    loadProductList() {
        let listParam = {}
        listParam.listType  = this.state.listType
        listParam.pageNum = this.state.pageNum

        if (this.state.listType ==='search') {
            listParam.searchType = this.state.searchType
            listParam.searchKeyword = this.state.searchKeyword
        }
        _Product.getProductList(listParam).then((res) => {
            this.setState(res)
        }).catch((err) => {
            this.setState({
                list:[]
            })
            _Utils.errorTips(err)
        })
    }
    onSearch(searchType,searchKeyword,){
       
        let listType = searchKeyword ===''?'list':'search'
        this.setState({
            listType:listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        },()=>{
            this.loadProductList()
        })
    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList()
        })
    }
    setProductStatus(e,productId,currentStatus){
        let newStatus = currentStatus==1?2:1;
        let confirmTips = currentStatus == 1 ?'确认下架':'确认上架'
        if (window.confirm(confirmTips)) {
            _Product.setProductStatus({
                productId: productId,
                status:newStatus
            }).then((res)=>{
                _Utils.successTips(res)
                this.loadProductList()
            }).catch((res)=>{
                _Utils.errorTips(res)
            })
        }
    }
    render() {
        let tableHeads = [
            { name: '商品ID', width: '10%' },
            { name: '商品信息', width: '50%' },
            { name: '价格', width: '10%' },
            { name: '状态', width: '15%' },
            { name: '操作', width: '15%' },
        ];
      
        return (
            <div className="" id="page-wrapper">
                <PageTitle title="商品列表" />
                <ListSearch onSearch={(type, keyword) => this.onSearch(type, keyword)}></ListSearch>         
                <TableList tableHeaders={tableHeads}>
                        {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>{product.status == 1 ? '在售' : '已下架'}</p>
                                        <button className="btn btn-warning btn-xs" onClick={(e) => { this.setProductStatus(e, product.id ,product.status)}}>
                                            {product.status == 1 ? '下架' : '上架'}
                                        </button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                                        <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
                                    </td>
                                </tr>
                            )
                        })
                        }
                </TableList>
                <Pagination
                    current={this.state.pageNum} total={this.state.total}
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}
                />
            </div>
        )
    }
}
export default ProductList

