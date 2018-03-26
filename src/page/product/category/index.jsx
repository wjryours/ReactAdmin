
import React from 'react';
import { Link } from 'react-router-dom';
import Utils from '@/utils/index.js'
import Product from '@/service/product-service.jsx'
import PageTitle from '@/components/page-title/index.jsx';
import TableList from '@/utils/table-list/index.jsx';

const _Utils = new Utils();
const _Product = new Product();

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        };
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if (oldPath !== newPath) {
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList();
            });
        }
    }
    // 加载品类列表
    loadCategoryList() {
        _Product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list: res
            });
        }, errMsg => {
            this.setState({
                list: []
            });
            _Utils.errorTips(errMsg);
        });
    }
    // 更新品类的名字
    onUpdateName(categoryId, categoryName) {
        let newName = window.prompt('请输入新的品类名称', categoryName);
        if (newName) {
            _Product.updateCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then(res => {
                _Utils.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _Utils.errorTips(errMsg);
            });
        }
    }
    render() {
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                            onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                        {
                            category.parentId === 0
                                ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                                : null
                        }
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID: {this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeaders={['品类ID', '品类名称', '操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

export default CategoryList;