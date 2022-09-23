import { useRefreshAuth } from '../hooks/use-refresh';

const TestStaticPage = () => {
	useRefreshAuth();

	return (
		<div>
			<h1>Esta página es estática</h1>
		</div>
	);
};

export default TestStaticPage;
