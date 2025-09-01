import {type FC, useState} from 'react';
import type {NavItemType} from "../../utils/app-types.ts";
import {AppBar, Box, Tab, Tabs} from "@mui/material";
import {Link, Outlet} from "react-router-dom";

type Props = {
    items: NavItemType[]
}
const NavigationDesktop:FC<Props> = ({items}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event)
        setValue(newValue);
    };

    return (
        <Box>
            <AppBar sx={{backgroundColor: "lightgrey"}}>
                <Tabs value={value} onChange={handleChange}>
                {items.map(item =>
                    <Tab key={item.route} component={Link} to={item.route} label={item.itemName}/>
                )}
            </Tabs>
            </AppBar>
            <Outlet/>
            </Box>
    );
};

export default NavigationDesktop;