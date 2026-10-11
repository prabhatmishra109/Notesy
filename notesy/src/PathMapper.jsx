import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Contact from "./components/common/Contact";

import About from "./components/common/About";
import AdminLogin from "./components/admin/AdminLogin";
import UserLogin from "./components/user/UserLogin";
import UserReg from "./components/user/UserReg";
import Feedback from "./components/user/Feedback";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import UserDashBoard from "./components/user/UserDashBoard";
import AllContact from "./components/admin/AllContact";
import AllFeedback from "./components/admin/AllFeedback";
import AllUser from "./components/admin/AllUser";
import UploadNotes from "./components/user/UploadNotes";

import AdminEditProfile from "./components/admin/AdminEditProfile";
import UserEditProfile from "./components/user/UserEditProfile";
import ChangePassword from "./components/admin/ChangePassword";
import UserChangePassword from "./components/user/UserChangePaasword";
import ProfileUpload from "./components/admin/ProfileUpload";
import UserProfileUpload from "./components/user/UserProfileUpload";
import FetchFeedback from "./components/common/FetchFeedback";
import TextSummarizerPage from "./components/user/TextSummarizerPage";
import FetchSummarizeHistory from "./components/user/FetchSummarizeHistory";
import ShareNotes from "./components/user/ShareNotes";
import ViewNotes from "./components/user/ViewNotes";

import Help2 from "./components/common/Help2";
import PrivacyPolicy from "./components/common/PrivacyPolicy";
import HomePage from "./components/common/HomePage";
import DemoPage from "./components/common/DEmoPage";
import UploadNotesDemo from "./components/common/UploadNotesDemo";
import Terms from "./components/common/Term";
import VideoDemo from "./components/common/VideoDemo";
import PaymentPage from "./components/user/PaymentPage";

import UploadAdvance from "./components/user/UploadAdvance";
import SmartMindMap from "./components/user/SmartMindMap";




function PathMapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/contact" element={<Contact/>} />
       
      
    
        <Route path="/adminLogin" element={<AdminLogin/>}></Route>
     
        <Route path="/userLogin" element={<UserLogin/>}></Route>
        <Route path="/userreg" element={<UserReg/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/feedback" element={<Feedback/>}></Route>
        <Route path="/admindashboard" element={<AdminDashBoard/>}></Route>
        <Route path="/userdashboard" element={<UserDashBoard/>}></Route>
        <Route path="/allcontacts" element={<AllContact/>}></Route>
        <Route path="/allfeedback" element={<AllFeedback/>}></Route>
        <Route path="/alluser" element={<AllUser/>}></Route>
        <Route path="/uploadnotes" element={<UploadNotes/>}></Route>
        <Route path="/adminEditProfile" element={<AdminEditProfile/>}></Route>
        <Route path="/userEditProfile" element={<UserEditProfile/>}></Route>
        <Route path="/adminchanepass" element={<ChangePassword/>}></Route>
        <Route path="/userchangepassword" element={<UserChangePassword/>}></Route>
        <Route path="/profileupload" element={<ProfileUpload/>}></Route>
        <Route path="/userprofileupload" element={<UserProfileUpload/>}></Route>
        <Route path="/fetchfeedback" element={<FetchFeedback/>}></Route>
        <Route path="/textsummarizerpage" element={<TextSummarizerPage/>}></Route>
        <Route path="/showHistory" element={<FetchSummarizeHistory/>}></Route>
        <Route path="/sharenotes" element={<ShareNotes/>}></Route>
        <Route path="/viewnotes" element={<ViewNotes/>}></Route>
        <Route path="/help2" element={<Help2/>}></Route>
        <Route path="/privacy" element={<PrivacyPolicy/>}></Route>
        <Route path="/homepage" element={<HomePage/>}></Route>
        <Route path="/demopage" element={<DemoPage/>}></Route>
        <Route path="/demoupload" element={<UploadNotesDemo/>}></Route>
        <Route path="/term" element={<Terms/>}></Route>
        <Route path="/videodemo" element={<VideoDemo/>}></Route>
        <Route path="/payment" element={<PaymentPage/>}></Route>
    
        <Route path="/upload" element={<UploadAdvance/>}></Route>
        <Route path="/smartmind" element={<SmartMindMap/>}></Route>
       
        
        




</Routes>
    </BrowserRouter>
  );
}

export default PathMapper;
