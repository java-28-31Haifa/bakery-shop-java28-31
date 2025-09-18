import {DataGrid, GridActionsCellItem, type GridColDef} from "@mui/x-data-grid";
import {Avatar, Box} from "@mui/material";
import type {ShopCartProdType, ShopCartProdViewType} from "../utils/app-types.ts";
import {useAppSelector} from "../redux/hooks.ts";
import {TrashBasketIcon} from "./templates/CustomIcons.tsx";
import {addProductToCart, removeProductFromCart} from "../firebase/firebaseCartService.ts";
import Typography from "@mui/material/Typography";


const ShoppingCart = () => {
    const {currProds} = useAppSelector(state => state.products);
    const {cartProducts} = useAppSelector(state => state.cart);
    const {authUser} = useAppSelector(state => state.auth);

    const getCartProdView = (cartProd:ShopCartProdType):ShopCartProdViewType => {
        let res:ShopCartProdViewType;
        const product = currProds.find(item => item.id === cartProd.prodId);
        if(!product)
            res = {amount: 0, category: "", cost: 0, id: cartProd.prodId, img: "", quantity: 0, title: "Product unavailable", unit: ""
            }
        else res = {...product, quantity: cartProd.count, amount: cartProd.count*product.cost};
        return res;
    }
    const cartProdView: ShopCartProdViewType[] = cartProducts.map(getCartProdView);
    function getTotalAmount() {
        return cartProdView.reduce((acc, item) => acc + item.amount, 0);
    }
    const columns:GridColDef<ShopCartProdViewType[][number]>[] = [
        {field: 'id', headerName: 'Id', flex: 0.3},
        {field: 'title', headerName: 'Product Name', flex: 1},
        {field: 'category', headerName: 'Category', flex: 0.3},
        {field: 'unit', headerName: 'Unit', flex: 0.3},
        {field: 'cost', headerName: 'Product cost', flex: 0.3},
        {field: 'quantity', headerName: 'Quantity', flex: 0.3, editable:true},
        {field: 'amount', headerName: 'Amount', flex: 0.3},
        {field: 'img',  flex: 0.4, headerName: "", renderCell:(params) =>
                <Avatar src={'/images/' + params.value}/>
        },
        {field:'actions', type:'actions',getActions: (params) => {
            return [
                <GridActionsCellItem label={'remove'} icon={<TrashBasketIcon/>}
                onClick={async () => {
                    await removeProductFromCart(`${authUser!.email}_cart_collection`, params.id as string)
                }}
                />
            ]
            }}
    ]

    return (
        <Box sx={{width: "90vw", height: "80vh", margin: "50px auto"}}>
           <DataGrid columns={columns} rows={cartProdView}
           processRowUpdate={async (newRow) => {
               if (newRow.quantity < 0 || newRow.quantity > 1000) throw ("Wrong quantity!");
               newRow.amount = newRow.quantity * newRow.cost;
               await addProductToCart(`${authUser!.email}_cart_collection`, {
                   prodId: newRow.id!,
                   count: newRow.quantity
               })
               return newRow;
           }}
           onProcessRowUpdateError={(err) => {alert(err + " Changes not saved!")}}
           />
            <Typography>Total amount: {getTotalAmount()} NIS</Typography>
        </Box>
    );
};

export default ShoppingCart;