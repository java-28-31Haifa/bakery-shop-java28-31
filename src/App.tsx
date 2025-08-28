import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import {Paths} from "./utils/paths.ts";
import ShoppingCart from "./components/ShoppingCart.tsx";
import Customers from "./components/Customers.tsx";
import Orders from "./components/Orders.tsx";
import Products from "./components/Products.tsx";
import Bread from "./components/Bread.tsx";
import Dairy from "./components/Dairy.tsx";
import Layout from "./components/navigation/Layout.tsx";
import ProductLayout from "./components/navigation/ProductLayout.tsx";

function App() {

    return (
        <Routes>
            <Route path={Paths.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={Paths.CART} element={<ShoppingCart/>}/>
                <Route path={Paths.CUSTOMERS} element={<Customers/>}/>
                <Route path={Paths.ORDERS} element={<Orders/>}/>
                <Route path={Paths.PRODUCTS} element={<ProductLayout/>}>
                    <Route path={Paths.BREAD} element={<Bread/>}/>
                    <Route path={Paths.DAIRY} element={<Dairy/>}/>
                </Route>

            </Route>
        </Routes>
    )
}

export default App
