import { FC } from 'react';
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

interface PropType {
    component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
    const isAuthenticated: boolean = Cookies.get("token")? true : false;

    if (isAuthenticated) return <Component />;
    return <Navigate to='/signin' />;
};

export default PrivateRoute;