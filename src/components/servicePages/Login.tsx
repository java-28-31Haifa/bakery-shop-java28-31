import SignIn from "../templates/SignIn.tsx";
import type {LoginData} from "../../utils/app-types.ts";
import {useAppDispatch} from "../../redux/hooks.ts";
import {setAuthUser} from "../../redux/slices/AuthSlice.ts";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loginFunc = (data:LoginData) => {
        dispatch(setAuthUser(data.login));
        navigate('/')
    }
    return (
        <div>
            <SignIn func={loginFunc}/>
            </div>
    );
};

export default Login;