import React from 'react'


class TableList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let tableHeader = this.props.tableHeaders.map((tableHead,index)=>{
            if (typeof tableHead === 'object') {
                return <th key={index} width={tableHead.width}>{tableHead.name}</th>
            } else if (typeof tableHead === 'string') {
                return <th key={index}>{tableHead}</th>
            }
        })
        let listBody = this.props.children
        let listError = (
            <tr>
                <td colSpan={this.props.tableHeaders} className="text-center">没有找到相应的结果</td>
            </tr>
        );
        let tableBody = listBody.length > 0 ? listBody : listError;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableBody
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default TableList