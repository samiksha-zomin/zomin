import SignUp from '../Pages/SignUp';
import Index from '../Pages/Index';
import Verify from '../Pages/Verify';

const Routes = [
    { path: "/", name: "home", component: Index},
    { path: "/signup", name: "signup", component: SignUp},
    { path: "/index", name: "index", component: Index},
    // { path: "/verify", name: "verify", component: Verify},
    { path: "/verify/:token", name: "verify", component: Verify},
];

export default Routes;