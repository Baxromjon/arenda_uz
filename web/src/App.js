import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/productPage/Products";
import Pagination from "./pages/OrderPage/OrderPageable"
import UserPageable from "./pages/userPage/UserPageable";
import AddOrder from "./pages/OrderPage/AddOrder";
import LastDayOrderPage from "./pages/userPage/LastDayOrderPage";


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LoginPage/>
                </Route>
                <Route path="/home">
                    <HomePage/>
                </Route>
                <Route path="/users">
                    <UserPage/>
                </Route>
                <Route path="/orders">
                    <OrderPage/>
                </Route>
                <Route path="/add-order">
                    <AddOrderPage/>
                </Route>
                <Route path="/last-order">
                    <LastDay/>
                </Route>
                <Route path="/*">
                    <NoMatch/>
                </Route>
            </Switch>
        </Router>
    );
}
function LoginPage(){
    return <Login/>
}
function HomePage(){
    return <Home/>
}
function AddOrderPage(){
    return <AddOrder/>
}
function UserPage(){
    return <UserPageable/>
}
function OrderPage(){
    return <Pagination/>
}
function LastDay(){
    return <LastDayOrderPage/>
}
function NoMatch(){
    let location=useLocation();

    return(
        <div>
            <h3>No match for <code>{location.pathname}</code></h3>
        </div>
    )
}

export default App;
