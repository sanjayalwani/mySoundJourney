import React, { useState, useEffect } from 'react';

export default function User(props) {
    const [user, setUser] = useState(null);

    async function fetchUserData(id) {
	const response = await fetch('/' + id);
	setUser(await response.json());
    }

    useEffect(() => {
	fetchUserData(props.id);
    }, [props.id]);

    if (!user) {
	return 'Loading...';
    }

    return (
	<details>
	    <summary>{user.name}</summary>
	    <strong>{user.age}</strong>
	    <br />
	    lives in {user.address}
	</details>
    );
}
