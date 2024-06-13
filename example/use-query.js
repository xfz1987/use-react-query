import { useQuery } from 'react-query';
import { fetchUser } from './api';

export default function App({ userId }) {
	const { data } = userQuery(['user', userId], fetchUser);

	return <div>{data.name}</div>;
}
