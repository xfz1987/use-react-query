import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';

export default function PostsList2() {
	const postQuery = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
	});

	const { status, data, error } = postQuery;

	if (status === 'pending') return <h1>Loading...</h1>;
	if (status === 'error') return <pre>{JSON.stringify(error)}</pre>;

	return (
		<div>
			<h1>Posts List 2</h1>
			<ol>
				{data?.map(post => (
					<div key={post.id}>{post.title}</div>
				))}
			</ol>
		</div>
	);
}
