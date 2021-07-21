import SignUp from '../Pages/SignUp';
import Index from '../Pages/Index';

const Routes = [
    { path: "/", name: "home", component: Index},
    { path: "/signup", name: "signup", component: SignUp},
    { path: "/index", name: "index", component: Index},
];

export default Routes;