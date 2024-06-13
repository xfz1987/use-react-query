import { useState } from 'react';
import PostsList1 from './components/PostsList1';
import PostsList2 from './components/PostsList2';

export default function Demo2() {
	const [currentPage, setCurrentPage] = useState(<PostsList1 />);

	return (
		<div>
			<button onClick={() => setCurrentPage(<PostsList1 />)}>Post List 1</button>
			<button onClick={() => setCurrentPage(<PostsList2 />)}>Post List 2</button>
			<br />
			{currentPage}
		</div>
	);
}
