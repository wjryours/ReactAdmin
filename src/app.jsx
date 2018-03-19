// hello world
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router ,Switch,Route,Link,Redirect} from "react-router-dom"

import Layout from "@/components/layout/index.jsx";
import Home from '@/page/home/index.jsx'
import Login from "@/page/login/index.jsx";
class APP extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/" render={props=>(
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/product" component={Home} />
                                <Route exact path="/product-category" component={Home} />
                            </Switch>
                        </Layout>
                    )} />
                </Switch>                
                
            </Router>         
        )    
    }
}
ReactDOM.render(
    <APP/>,
    document.getElementById('app')
);
