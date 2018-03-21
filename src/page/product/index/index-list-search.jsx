// hello world
import React from 'react';

class ListSearch extends React.Component {
    constructor(props){
        super(props)
        this.state={
            searchType:'productId',
            searchKeyword:''
        }
    }
    onValueChange(e){
        let name=e.target.name;
        let value = e.target.value.trim()
        this.setState({
            [name]:value
        })
    }
    onSearch(){
        this.props.onSearch(this.state.searchType,this.state.searchKeyword)
    }
    onSearchKeywordUp(e){
        if (e.keyCode==13) {
            this.onSearch()
        }
    }
    render() {

        return (
            <div className="row search-warp">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control"
                            name="searchType" 
                            onChange={(e)=>this.onValueChange(e)}
                            >
                                <option value="productId">按商品id</option>
                                <option value="productName">按商品名称</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text"
                            name="searchKeyword"
                            onKeyUp={(e)=>this.onSearchKeywordUp(e)}
                            onChange={(e) => this.onValueChange(e)}
                            className="form-control" />
                        </div>
                        <button className="btn btn-primary" 
                            onClick={(e) => this.onSearch(e)}
                        >搜索</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListSearch
