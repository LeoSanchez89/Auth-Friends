import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { axiosWithAuth } from "./utils/axiosWithAuth";

import { FriendsContext } from "./contexts/FriendsContext";
import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";
// import FriendsForm from "./components/FriendsForm";

import "./App.css";

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
				{window.localStorage.getItem("token") ? null : (
					<nav>
						<Link className="link" to="/login">Login</Link>

						<Link className="link" to="/protected">Friends List</Link>
					</nav>
				)}

				<FriendsContext.Provider value={{ friends, setFriends }}>
					<Switch>
						{/* <PrivateRoute exact path="/protected" component={FriendsForm} /> */}
						<PrivateRoute exact path="/protected" component={FriendsList} />
						<Route path="/login" component={Login} />
						<Route component={Login} />
					</Switch>
				</FriendsContext.Provider>
			</div>
		</Router>
	);
}

export default App;
