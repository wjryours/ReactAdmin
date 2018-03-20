import React from 'react'
import RcPagetion from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

class Pagination extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <RcPagetion {...this.props} hideOnSinglePage showQuickJumper/>
                </div>
            </div>
        )
    }
}
export default Pagination