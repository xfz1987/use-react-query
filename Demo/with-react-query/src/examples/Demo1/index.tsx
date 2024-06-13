import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const POSTS = [
	{ id: 1, title: 'Post 1' },
	{ id: 2, title: 'Post 2' },
];

// queryKey following like this
// /posts              --> ['posts']
// /posts/1            --> ['posts', 1]
// /posts?id=1         --> ['posts', { id: 1 }]
// /posts/2/comments   --> ['posts', 2, 'comments']

function Demo1(props: any) {
	// console.log(POSTS);

	const queryClient = useQueryClient();

	const postQuery = useQuery({
		queryKey: ['posts'], // Custom query key, ensure it's unique
		queryFn: () => sleep(1000).then(() => [...POSTS]),
		// queryFn: () => Promise.reject('Error Message'),
		// when an error occurs, useQuquery is gonna retry 3 times automatically,
		// so you can see the page render later than before
	});

	// When click button. that is supoosed to request data again, that's ensure your processing data is latest.
	const newPostMutation = useMutation({
		// mutationKey: ['posts'],
		mutationFn: (title: string) => sleep(1000).then(() => POSTS.push({ id: parseInt(crypto.randomUUID()), title })),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});

	const { isLoading, isError, error, data } = postQuery;

	if (isLoading) return <h1>Loading...</h1>;
	if (isError) return <pre>{JSON.stringify(error)}</pre>;

	return (
		<div>
			{data?.map(post => (
				<div key={post.id}>{post.title}</div>
			))}
			{/* <button onClick={() => newPostMutation.mutate('New Post')}>Add New+</button> */}
			<button
				disabled={newPostMutation.isPending}
				onClick={() => newPostMutation.mutate('New Post')}
			>
				Add New+
			</button>
		</div>
	);
}

function sleep(duration: number) {
	return new Promise(resolve => setTimeout(resolve, duration));
}

export default Demo1;
