// hello world
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router ,Switch,Route,Link,Redirect} from "react-router-dom"

import Layout from "@/components/layout/index.jsx";
import Home from '@/page/home/index.jsx'
class APP extends React.Component{
    render(){
        return(
            <Router>                
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/product" component={Home} />
                        <Route exact path="/product-category" component={Home} />
                        <Route exact path="/order" component={Home} />
                        <Route exact path="/user" component={Home} />
                    </Switch>
                </Layout>
            </Router>         
        )    
    }
}
ReactDOM.render(
    <APP/>,
    document.getElementById('app')
);
