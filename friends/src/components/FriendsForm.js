import React, { useContext } from "react";

import { FriendsContext } from "../contexts/FriendsContext";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const FriendsForm = () => {
	const { setFriends } = useContext(FriendsContext);

	const initialState = {
		name: "",
		age: "",
		email: ""
	};

	const [data, setData] = React.useState(initialState);

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

	const handleFormSubmit = event => {
		event.preventDefault();
		axiosWithAuth()
			.post("/api/friends", {
				name: data.name,
				age: data.age,
				email: data.email
			})
			.then(res => {
				setFriends(res.data);
				// console.log(res.data);
				setData(initialState);
			})
			.catch(err => {
				console.log("error posting data", err);
			});
	};

	return (
		<div>
			<h2>Add a Friend</h2>

			<form onSubmit={handleFormSubmit}>
				<input
					className="input-field"
					type="text"
					placeholder="Name"
					value={data.name}
					name="name"
					id="name"
					onChange={handleInputChange}
					required
				/>

				<input
					className="input-field"
					type="text"
					placeholder="Age"
					value={data.age}
					name="age"
					id="age"
					onChange={handleInputChange}
					required
				/>

				<input
					className="input-field"
					type="text"
					placeholder="email"
					value={data.email}
					name="email"
					id="email"
					onChange={handleInputChange}
					required
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default FriendsForm;
