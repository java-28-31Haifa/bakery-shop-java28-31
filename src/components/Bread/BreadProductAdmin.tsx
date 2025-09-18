import {Avatar, Box} from "@mui/material";
import {DataGrid, GridActionsCellItem, type GridColDef} from "@mui/x-data-grid";
import {useAppSelector} from "../../redux/hooks.ts";
import type {ProductType} from "../../utils/app-types.ts";
import {TrashBasketIcon} from "../templates/CustomIcons.tsx";
import {removeProduct} from "../../firebase/firebaseDBService.ts";


const BreadProductAdmin = () => {

    const {currProds} = useAppSelector(state => state.products)

    const columns: GridColDef<(ProductType[])[number]>[] = [
        {field: 'id', headerName: 'Id', width: 90, flex: 0.3},
        {field: 'title', headerName: 'Product name', width: 90, flex: 1},
        {field: 'category', headerName: 'Category', width: 90, flex: 0.4},
        {field: 'unit', headerName: 'Unit', width: 90, flex: 0.4},
        {field: 'cost', headerName: 'Price in NIS', width: 90, flex: 0.4},
        {field: 'img',  flex: 0.4, headerName: "", renderCell:(params) =>
                <Avatar src={'/images/' + params.value}/>
            },
        {field:'actions', type: 'actions', getActions: (params) =>
            [
                <GridActionsCellItem label={'remove'} icon={<TrashBasketIcon/>}
                onClick={async () => {
                    await removeProduct(params.id as string)
                }}
                />
            ]
            }
    ]
    return (
        <Box sx={{width: "90vw", height: "80vh", margin: "20px auto"}}>
            <DataGrid columns={columns} rows={currProds}/>
        </Box>
    );
};

export default BreadProductAdmin;