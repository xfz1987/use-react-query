import { useEffect, useState } from 'react';

export default function WithUseEffect() {
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchProducts = async () => {
		try {
			setLoading(true);

			console.log('start fetchiing...');
			const { data } = await axios.get('http://example-api/products');
			if (data) setProducts(data);
		} catch (error) {
			console.error(error);
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log('Component mounted...');
		fetchProducts();
	}, []);

	return isLoading ? (
		<div>Loading...</div>
	) : (
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
// Component mounted...
// start fetchiing...
