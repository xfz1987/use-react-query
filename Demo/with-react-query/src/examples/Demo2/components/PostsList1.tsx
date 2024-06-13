import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';

export default function PostsList1() {
	// const postQuery = useQuery({
	// 	queryKey: ['posts'],
	// 	queryFn: getPosts,
	// 	staleTime: 1000 * 60 * 5,
	// 	// refetchInterval: 1000 * 60
	// });

	const postQuery = useQuery({
		queryKey: ['posts', id],
		queryFn: () => getPosts(id),
	});

	const userQuery = useQuery({
		queryKey: ['user', postQuery?.data?.userId],
		enabled: postQuery?.data?.userId !== null,
		queryFn: () => getUser(postQuery.data.userId),
	});

	const { status, data, error, fetchStatus } = postQuery;

	if (status === 'pending') return <h1>Loading...</h1>;
	if (status === 'error') return <pre>{JSON.stringify(error)}</pre>;

	return (
		<div>
			<h1>Posts List 1</h1>
			<ol>
				{data?.map(post => (
					<div key={post.id}>{post.title}</div>
				))}
			</ol>
		</div>
	);
}
