import { Menu, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../css/podcasts.css';
import { useSelector } from 'react-redux';

/**
 *
 * @description Muestra el header y tambien el estado de carga con la variable del store loadingGlobal
 * @returns
 */
const PodcastHeader = () => {
	const loadingGlobal = useSelector(state => state.loading.value);
	return (
		<Menu secondary pointing>
			<Menu.Item as={Link} to="/">
				<h1 className="ui blue header">Podcaster</h1>
			</Menu.Item>
			<Menu.Item fitted="vertically" position="right">
				<div className="podcast-spinner">
					<Loader size="small" active={loadingGlobal} />
				</div>
			</Menu.Item>
		</Menu>
	);
};

export default PodcastHeader;
