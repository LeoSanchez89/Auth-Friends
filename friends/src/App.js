import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { axiosWithAuth } from "./utils/axiosWithAuth";

import { FriendsContext } from "./contexts/FriendsContext";
import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";

import './App.css';

function App() {

  const [friends, setFriends] = useState([]);

  useEffect(() => {
		axiosWithAuth()
			.get("/api/friends")
			.then(res => {
				console.log(res.data);
				setFriends(res.data);
			})
			.catch(err => {
				console.log("error fetching from api", err);
			});
	}, []);

	return (
		<Router>
      <div className="App">
        <div><h1>My Friends List</h1></div>
				<ul>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/protected">Friends List</Link>
					</li>
				</ul>
				<Switch>
					<FriendsContext.Provider value={{ friends, setFriends }}>
						<PrivateRoute exact path="/protected" component={FriendsList} />
						<Route path="/login" component={Login} />
						{/* <Route component={Login} /> */}
					</FriendsContext.Provider>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
