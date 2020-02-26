import React, { useContext } from "react";
import { FriendsContext } from "../contexts/FriendsContext";
import FriendsForm from "./FriendsForm";

const FriendsList = () => {
	const { friends } = useContext(FriendsContext);

	return (
        <section>
            <FriendsForm />
			<div>
				{friends.map(friend => {
					return (
						<div key={friend.id}>
							<p>Name: {friend.name}</p>
							<p>Age: {friend.age}</p>
							<p>Email: {friend.email}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default FriendsList;
