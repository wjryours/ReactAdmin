// hello world
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router ,Switch,Route,Link,Redirect} from "react-router-dom"

import Layout from "@/components/layout/index.jsx";
import Home from '@/page/home/index.jsx'
import Login from "@/page/login/index.jsx";
import UserList from "@/page/user/index.jsx"
import ErrorPage from "@/page/error/index.jsx";
import ProducRouter from "@/page/product/router.jsx";
import OrderList from "@/page/order/index.jsx";
import OrderDetail from '@/page/order/detail.jsx'
class APP extends React.Component{
   
    render(){
         let LatoutRouter =(
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/product" component={ProducRouter} />
                                <Route path="/product-category" component={ProducRouter} />
                                <Route path="/order/index" component={OrderList} />
                                <Route path="/order/detail/:orderNumber?" component={OrderDetail} />
                                <Route  path="/user/index" component={UserList} />
                                <Redirect exact from="/user" to="/user/index" /> 
                                <Route component={ErrorPage} />
                            </Switch>
                        </Layout>
                    )
        return(
            <Router>
                <Switch>
                    <Route  path="/login" component={Login} />
                    <Route  path="/" render={props=>LatoutRouter} />
                </Switch>                
                
            </Router>         
        )    
    }
}
ReactDOM.render(
    <APP/>,
    document.getElementById('app')
);
