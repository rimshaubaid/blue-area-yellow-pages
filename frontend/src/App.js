import './App.css';
import MainSection from './components/HomePage/MainSection';
import Navbar from './components/Navbar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/UserAccount/Signup';
import Login from './components/UserAccount/Login';
import Footer from './components/Footer/Footer';
import Restaurants from './components/Restaurants/Restaurants';
import Fitness from './components/Fitness/Fitness';
import Grocery from './components/Grocery/Grocery';
import CarRepair from './components/CarRepair/CarRepair';
import Medical from './components/Medical/Medical';
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';
import PrivateRoute from './components/PrivateRoute/privateRoute';
import Dashboard from './components/Dashboard/dashboard';
import BusinessEntry from './pages/Business/BusinessEntry';
import BusinessMap from './components/DiscoverBusiness/maps';
import ViewModal from './components/Modal/viewModal';
import Venues from './components/Venues/venues';
import UserList from './components/Dashboard/userlist';
import BusinessList from './components/Dashboard/businesslist';
import FilterByDelivery from './components/Restaurants/filterByDelivery';
import UserBusiness from './UserProfile/business';
import UserReviews from './UserProfile/reviews';
import AllReviews from './components/Dashboard/allreviews';
import Traffic from './components/Traffic/traffic';
import FilterByLoc from './components/Restaurants/filterByLoc';
import ReviewsBusiness from './UserProfile/businessReviews';
import Others from './components/Others/Others';
if(localStorage.jwtToken){
  const token=localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded)); 
}
  function App(){
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainSection} />
            <Route path="/restaurants" component={Restaurants} />
            <Route path="/fitness" component={Fitness} />
            <Route path="/car-repair" component={CarRepair} />
            <Route path="/medical" component={Medical} />
            <Route path="/grocery-stores" component={Grocery} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route path="/users" component={UserList} />
            <Route path="/business-entry" component={BusinessEntry} />
            <Route path="/maps" component={BusinessMap} />
            <Route path="/viewModal" component={ViewModal} />
            <Route path="/venues" component={Venues} />
            <Route path="/business" component={BusinessList} />
            <Route path="/filterByDelivery" component={FilterByDelivery} />
            <Route path="/filterByLoc" component={FilterByLoc} />
            <Route path="/businessAddedByUser" component={UserBusiness} />
            <Route path="/reviewsAddedByUser" component={UserReviews} />
            <Route path="/allreviews" component={AllReviews} />
            <Route path="/traffic-details" component={Traffic} />
            <Route path="/reviewsBusiness" component={ReviewsBusiness} />
            <Route path="/others" component={Others} />
            <div className="outer">
              <div className="inner">
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </div>
            </div>
          </Switch>
        </div>

        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
