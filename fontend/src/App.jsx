import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { About } from './pages/About'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { ComplaintReply } from './pages/Complaint Managment/ComplaintReply'
import { DeleteComplaints } from './pages/Complaint Managment/DeleteComplaints'
import { MyComplaints } from './pages/Complaint Managment/MyComplaints'
import { AllComplaint } from './pages/Complaint Managment/AllComplaint'
import { Complaint } from './pages/Complaint Managment/Complaint'
import { AdminLogin } from './pages/Admin managment/AdminLogin'
import { AdminDashboard } from './pages/Admin managment/AdminDashboard'
import { Farmer } from './pages/Farmer Management/Farmer'
import { FarmerLogin } from './pages/Farmer Management/FarmerLogin'
import { MillOwner } from './pages/Mill owner Managment/MillOwner'
import { ShowOwner } from './pages/Show Owner Management/ShowOwner'
import ShowListings from './pages/Paddy List Management/ShowListings'
import CreateList from './pages/Paddy List Management/CreateList'
import EditList from './pages/Paddy List Management/EditList'
import DeleteList from './pages/Paddy List Management/DeleteList'
import { MillOwnerLogin } from './pages/Mill owner Managment/MillOwnerLogin'
import Orders from './pages/Order Management/Orders'
import CreateOrders from './pages/Order Management/CreateOrders'
import ShowOrder from './pages/Order Management/ShowOrder'
import EditOrder from './pages/Order Management/EditOrder'
import DeleteOrder from './pages/Order Management/DeleteOrder'
import Listpage from './pages/Paddy List Management/Listpage'
import ShopownerReq from './pages/Paddy List Management/ShopownerReq'
import FarmerReq from './pages/Paddy List Management/FarmerReq'
import ManageList from './pages/Paddy List Management/ManageList'
import { SuccessfulOrders } from './pages/Tracking Management/SuccessfulOrders'
import TrackList from './pages/Tracking Management/TrackList';
import CreateTrack from './pages/Tracking Management/CreateTrack';
import Steppe from './pages/Tracking Management/Stepper';
import ShowTrack from './pages/Tracking Management/ShowTrack';
import DeleteTrack from './pages/Tracking Management/DeleteTrack';
import EditTrack from './pages/Tracking Management/EditTrack';
import { StepperProvider } from './pages/Tracking Management/StepperContext'
import { ShopownerLogin } from './pages/Show Owner Management/ShopownerLogin'
import ViewList from './pages/Paddy List Management/ViewList'



import ShowAll from './pages/Review & Notification Management/ShowAll'
import CreateReview from './pages/Review & Notification Management/CreateReview'
import ShowReview from './pages/Review & Notification Management/ShowReview'
import EditReview from './pages/Review & Notification Management/EditReview'
import DeleteReview from './pages/Review & Notification Management/DeleteReview'
import Notification from './pages/Review & Notification Management/Notification'
import FullNotification from './pages/Review & Notification Management/FullNotification'
import SubmitPage from './pages/Review & Notification Management/SubmitPage'
import DeletePage from './pages/Review & Notification Management/DeletePage'
import CreateNotification from './pages/Review & Notification Management/CreateNotification'


import AllFarmers from './pages/Farmer Management/AllFarmers'
import { DeleteFarmers } from './pages/Farmer Management/DeleteFarmers'
import { AllMillOwners } from './pages/Mill owner Managment/AllMillOwners'
import { DeleteMillowners } from './pages/Mill owner Managment/DeleteMillowners'
import AllShopowners from './pages/Show Owner Management/ViewShopowners'
import { DeleteShopowners } from './pages/Show Owner Management/DeleteShopowners'
import { UpdateComplaint } from './pages/Complaint Managment/UpdateComplaint'
import { CreatePayment } from './pages/Payment Management/CreatePayment'
import { PaymentDetails } from './pages/Payment Management/PaymentDetails'
import { DeletePayment } from './pages/Payment Management/DeletePayment'
import { PaymentUpdate } from './pages/Payment Management/PaymentUpdate'
import { MyPayments } from './pages/Payment Management/MyPayments'
import { AllTrackings } from './pages/Review & Notification Management/AllTrackings'
import { ShopOwnerProfile } from './pages/Show Owner Management/ShopOwnerProfile'
import { MillOwnerProfile } from './pages/Mill owner Managment/MillOwnerProfile'
import { FarmerProfile } from './pages/Farmer Management/FarmerProfile'
import { UpdateFarmer } from './pages/Farmer Management/UpdateFarmer'
import { UpdateMillOwner } from './pages/Mill owner Managment/UpdateMillOwner'
import { UpdateShopOwner } from './pages/Show Owner Management/UpdateShopOwner'
import Show from './pages/Review & Notification Management/Show'
import { H1 } from './pages/H1'
import {UserProvider} from './UserContext'


const App = () => {
  return (
    <div>

      <UserProvider>
      <StepperProvider>
        <Routes>
          <Route index path='/' element={<Home />} />

          <Route index path='/about' element={<About />} />
          <Route index path='/signup' element={<SignUp />} />
          <Route index path='/adminlogin' element={<AdminLogin />} />
          <Route index path='/millowner/:email' element={<MillOwner />} />
          <Route index path='/millownerlogin' element={<MillOwnerLogin />} />
          <Route index path='/shopowner' element={<ShowOwner />} />
          <Route index path='/admin' element={<AdminDashboard />} />
          <Route index path='/farmer/:email' element={<Farmer />} />
          <Route index path='/login' element={<Login />} />
          <Route index path='/farmerlogin' element={<FarmerLogin />} />
          <Route index path='/allfarmers' element={<AllFarmers />} />
          <Route index path='/deletefarmerss/:id' element={<DeleteFarmers />} />
          <Route index path='/allmillowners' element={<AllMillOwners />} />
          <Route index path='/deletemillowners/:id' element={<DeleteMillowners />} />
          <Route index path='/allshopowners' element={<AllShopowners />} />
          <Route index path='/deleteshopowners/:id' element={<DeleteShopowners />} />
          <Route index path='/shopownerlogin' element={<ShopownerLogin />} />
          <Route index path='/shopowner/:email' element={<ShowOwner />} />
          <Route index path='/updatefarmer/:id' element={<UpdateFarmer />} />
          <Route index path='/updatemillowner/:id' element={<UpdateMillOwner />} />
          <Route index path='/updateshopowner/:id' element={<UpdateShopOwner />} />
          <Route index path='/h1' element={<H1 />} />





          <Route index path='/complaint/:email' element={<Complaint />} />
          <Route index path='/allcomplaints' element={<AllComplaint />} />
          <Route index path='/mycomplaints/:email' element={<MyComplaints />} />
          <Route index path='/deletecomplaints/:id' element={<DeleteComplaints />} />
          <Route index path='/reply/:id' element={<ComplaintReply />} />
          <Route index path='/updatecomplaint/:id' element={<UpdateComplaint />} />
          <Route index path='/shopownerprofile/:id' element={<ShopOwnerProfile />} />
          <Route index path='/millownerprofile/:id' element={<MillOwnerProfile />} />
          <Route index path='/farmerProfile/:id' element={<FarmerProfile />} />




          <Route index path='/lists/show/:email' element={<ShowListings />} />
          <Route index path='/lists/create/:email' element={<CreateList />} />
          <Route index path='/lists/details/:id/:email' element={<FarmerReq />} />
          <Route index path='/lists/edit/:id' element={<EditList />} />
          <Route index path='/lists/delete/:id' element={<DeleteList />} />
          <Route index path='/lists/delete/:id' element={<DeleteList />} />
          <Route index path='/lists/details/:id/:email' element={<Listpage />} />
          <Route index path='/lists/Manage/:email' element={<ManageList />} />
          <Route index path='/lists/sorequest' element={<ShopownerReq />} />
          <Route index path='/lists/view/:id' element={<ViewList />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/create/:id/:email" element={<CreateOrders />} />
          <Route path="/orders/details/:id" element={<ShowOrder />} />
          <Route path="/orders/edit/:id" element={<EditOrder />} />
          <Route path="/orders/delete/:id" element={<DeleteOrder />} />


          <Route path='/reviews/show/:name' element={<ShowAll />} />
          <Route path='/reviews/create/:ordernumber' element={<CreateReview />} />
          <Route path='/reviews/details/:id' element={<ShowReview />} />
          <Route path='/reviews/edit/:id' element={<EditReview />} />
          <Route path='/reviews/delete/:id' element={<DeleteReview />} />
          <Route path='/notification/detailsByName/:name' element={<Notification />} />
          <Route path='/notifications/details/:id' element={<FullNotification />} />
          <Route path='/submit' element={<SubmitPage />} />
          <Route path='/DeletePage' element={<DeletePage />} />
          <Route path='/createNotifi/:id' element={<CreateNotification />} />
          <Route path='/alltracking' element={<AllTrackings />} />
          <Route path='/reviews/millowner' element={<Show/>} />


          <Route path='/createPayment/:id' element={<CreatePayment />} />
          <Route path='/allpayments' element={<PaymentDetails />} />
          <Route path='/deletepayment/:id' element={<DeletePayment />} />
          <Route path='/updatepayment/:id' element={<PaymentUpdate />} />
          <Route path='/mypayment/:email' element={<MyPayments />} />

          <Route path="/successfullOrders/:email" element={<SuccessfulOrders />} />
          <Route path="/tracks" element={<TrackList />} />
          <Route path="/tracks/details/:id" element={<ShowTrack />} />
          <Route path="/tracks/Edit/:id" element={<EditTrack />} />
          <Route path="/tracks/stepper/:id" element={<Steppe />} />
          <Route path="/tracks/create/:id" element={<CreateTrack />} />
          <Route path="/tracks/delete/:id" element={<DeleteTrack />} />







        </Routes>
      </StepperProvider>
      </UserProvider>
    </div>
  )
}

export default App