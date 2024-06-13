const API_BASE_URL = 'http://example-api.com';

export function fetchUser(userId) {
	return fetch(`${API_BASE_URL}/users/${userId}`)
		.then(res => {
			if (!res.ok) {
				throw new Error(`Error: ${res.status}`);
			}
			return res.json();
		})
		.then(data => data)
		.catch(e => {
			console.error('Fetch user failed', e);
			throw e;
		});
}
