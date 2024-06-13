import { useEffect, useState } from 'react';
import { useQUery } from 'react-query';
import { fetchProducts } from '../api/products';

const fetchProducts = async () => {
	console.log('start fetchiing...');
	const { data } = await axios.get('http://example-api/products');
	return data;
};

export default function WithReactQuery() {
	console.log('Rendering....');

	const { isError, isSuccess, isLoading, data, error } = useQUery(['products'], fetchProducts, { staleTime: 60000 });

	useEffect(() => {
		console.log('Component mounted...');
	}, []);

	if (isLoading) {
		console.log('Loading...');
		return <div>Loading...</div>;
	}

	if (isError) {
		console.error(error);
		return <div>Error...</div>;
	}

	return (
		<div>
			{products.map(product => (
				<Product
					key={product.id}
					product={product}
				/>
			))}
		</div>
	);
}

// Code execution sequence：
// Rendering....
// Loading...
// start fetchiing...
// Component mounted...
// Rendering....
