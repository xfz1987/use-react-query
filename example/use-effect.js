import React, { useState, useEffect } from 'react';
import { fetchUser } from './api';

function App({ userId }) {
	const [user, setUser] = useState(null);
	useEffect(() => {
		fetchUser(userId).then(data => setUser(data));
	}, [userId]);

	return <div>{user.name}</div>;
}

export default use - effect;
