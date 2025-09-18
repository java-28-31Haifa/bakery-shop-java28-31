import {useAppSelector} from "../../redux/hooks.ts";
import {Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import type {ProductType} from "../../utils/app-types.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {addProductUnitToCart, removeProductUnitFromCart} from "../../firebase/firebaseCartService.ts";
import {useNavigate} from "react-router-dom";


const BreadProductUser = () => {
    const {currProds} = useAppSelector(state => state.products);
    const {authUser} = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    return (
        <Grid container spacing={2} sx={{margin:"50px auto"}}>
            {currProds.map((item:ProductType) =>
                <Grid key={item.id} size={{xs:12, sm:6, md:4, lg:3}}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={"/images/"+ item.img}
                            title={item.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions sx={{justifyContent:"space-evenly"}}>
                            <Button size="small" variant={"outlined"} sx={{fontSize:"1.2rem"}}
                            onClick={async () => {
                                if(!authUser) navigate('/login')
                                else try {
                                    await addProductUnitToCart(`${authUser!.email}_cart_collection`, item.id!)
                                } catch (e) { alert("Something went wrong, try again" + e)
                                }
                            }}
                            >+</Button>
                            <Typography sx={{fontSize:"1.2rem"}}>0</Typography>
                            <Button size="small" variant={"outlined"} sx={{fontSize:"1.2rem"}} disabled={!authUser}
                                    onClick={async () => {
                                    try {
                                            await removeProductUnitFromCart(`${authUser!.email}_cart_collection`, item.id!)
                                        } catch (e) { alert("Something went wrong, try again" + e)
                                        }
                                    }}
                            >-</Button>
                        </CardActions>
                    </Card>

                </Grid>
            )}
        </Grid>
    );
};

export default BreadProductUser;