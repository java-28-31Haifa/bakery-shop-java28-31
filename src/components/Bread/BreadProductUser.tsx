import {useAppSelector} from "../../redux/hooks.ts";
import {Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import type {ProductType} from "../../utils/app-types.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const BreadProductUser = () => {
    const {currProds} = useAppSelector(state => state.products)

    return (
        <Grid container>
            {currProds.map((item:ProductType) =>
                <Grid key={item.id}>
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
                        <CardActions>
                            <Button size="small" variant={"outlined"}>+</Button>
                            <Typography>0</Typography>
                            <Button size="small" variant={"outlined"}>-</Button>
                        </CardActions>
                    </Card>

                </Grid>
            )}
        </Grid>
    );
};

export default BreadProductUser;