import SignUp from '../Pages/SignUp';
import SignUpEmployer from '../Pages/SignUpEmployer';
import Index from '../Pages/Index';
import Employer from '../Pages/Employer';
import Verify from '../Pages/Verify';
import Partner from '../Pages/Partner';
import PartnerLanding from '../Pages/PartnerLanding';
import Opportunity from '../Pages/Opportunity';
import OpportunityLanding from '../Pages/OpportunityLanding';
import BasicInfo from '../Pages/BasicInfo';
import Dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile';
import Application from '../Pages/Application';
import Interview from '../Pages/Interview';
import Resume from '../Pages/Resume';
import Settings from '../Pages/Settings';
import AboutUs from '../Pages/AboutUs';
import Faq from '../Pages/Faq';
import ResetPassword from '../Pages/ResetPassword';
import ResetPasswordToken from '../Pages/ResetPasswordToken';
import ForgetPassword from '../Pages/ForgetPassword';
import Contact from '../Pages/Contact';
import PrivacyPolicy from '../Pages/PrivacyPolicy';
import TermOfUse from '../Pages/TermOfUse';
import TermOfBusiness from '../Pages/TermOfBusiness';
import SpiceIN from '../Pages/SpiceIN';
import SpiceINLanding from '../Pages/SpiceINLanding';


import ZomAdminUser from '../Pages/ZomAdminUser';
import ZomDashboard from '../Pages/ZomDashboard';
import ZomAdminStudent from '../Pages/ZomAdminStudent';
import ZomAdminEmployer from '../Pages/ZomAdminEmployer';
import ZomAdminPartner from '../Pages/ZomAdminPartner';
import ZomAdminPartnerApplication from '../Pages/ZomAdminPartnerApplication';
import ZomAdminPartnerSavedApplication from '../Pages/ZomAdminPartnerSavedApplication';
import ZomAdminJobVacancy from '../Pages/ZomAdminJobVacancy';
import ZomAdminJobApplication from '../Pages/ZomAdminJobApplication';
import ZomAdminSpiceIN from "../Pages/ZomAdminSpiceIN";







const Routes = [
    { path: "/", name: "home", element: <Index />},
    { path: "/signup", name: "signup", element: <SignUp />},
    { path: "/signup-employer", name: "signup-employer", element: <SignUpEmployer />},
    { path: "/index", name: "index", element: <Index/>},
    { path: "/employer", name: "employer", element: <Employer/>},
    { path: "/verify/:token", name: "verify", element: <Verify/>},
    { path: "/partner", name: "partner", element: <Partner/>},
    { path: "/partner/:companyname", name: "partnerlanding", element: <PartnerLanding/>},
    { path: "/opportunity", name: "opportunity", element: <Opportunity/>},
    { path: "/opportunity/:company/:jobtitle/:oppoID", name: "opportunitylanding", element: <OpportunityLanding/>},
    { path: "/basicinfo", name: "basicinfo", element: <BasicInfo/>},
    { path: "/dashboard", name: "dashboard", element: <Dashboard/>},
    { path: "/profile", name: "profile", element: <Profile/>},
    { path: "/application", name: "application", element: <Application/>},
    { path: "/interview", name: "interview", element: <Interview/>},
    { path: "/resume/:token", name: "resume", element: <Resume/>},
    { path: "/settings", name: "settings", element: <Settings/>},
    { path: "/aboutus", name: "aboutus", element: <AboutUs/>},
    { path: "/faq", name: "faq", element: <Faq/>},
    { path: "/resetpassword", name: "resetpassword", element: <ResetPassword/>},
    { path: "/resetpassword/:token", name: "resetpasswordtoken", element: <ResetPasswordToken/>},
    { path: "/forgetpassword", name: "forgetpassword", element: <ForgetPassword/>},
    { path: "/contact", name: "contact", element: <Contact/>},
    { path: "/privacypolicy", name: "privacypolicy", element: <PrivacyPolicy/>},
    { path: "/termofuse", name: "termofuse", element: <TermOfUse/>},
    { path: "/termofbusiness", name: "termofbusiness", element: <TermOfBusiness/>},
    { path: "/spiceIN", name: "spiceIN", element: <SpiceIN/>},
    { path: "/spiceIN/:spiceinLanding", name: "SpiceINLanding", element: <SpiceINLanding/>},



    { path: "/zomAdminUser", name: "zomAdminUser", element: <ZomAdminUser/>},
    { path: "/zomDashboard", name: "zomDashboard", element: <ZomDashboard/>},
    { path: "/zomAdminStudent", name: "zomAdminStudent", element: <ZomAdminStudent/>},
    { path: "/zomAdminEmployer", name: "zomAdminEmployer", element: <ZomAdminEmployer/>},
    { path: "/zomAdminPartner", name: "zomAdminPartner", element: <ZomAdminPartner/>},
    { path: "/zomAdminPartnerApplication", name: "zomAdminPartnerApplication", element: <ZomAdminPartnerApplication/>},
    { path: "/zomAdminPartnerSavedApplication", name: "zomAdminPartnerSavedApplication", element: <ZomAdminPartnerSavedApplication/>},
    { path: "/zomAdminJobVacancy", name: "zomAdminJobVacancy", element: <ZomAdminJobVacancy/>},
    { path: "/zomAdminJobApplication", name: "zomAdminJobApplication", element: <ZomAdminJobApplication/>},
    { path: "/zomAdminSpiceIN", name: "zomAdminSpiceIN", element: <ZomAdminSpiceIN/>},

];

export default Routes;

