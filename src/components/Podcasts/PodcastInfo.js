import { Card } from 'semantic-ui-react';
import { useParams, Link } from 'react-router-dom';
import ROUTES from '../../utils/routes';

/**
 *
 * @param {*} param0 }
 * @description Muestra la informacion lateral del detalle del podcast
 * @returns
 */
const PodcastInfo = ({ data }) => {
	const { name, artistName, artwork, description } = data;
	const routeParams = useParams();
	const { podcastId } = routeParams;

	return (
		<Link
			to={{
				pathname: `/${ROUTES.PODCAST}/${podcastId}`,
			}}
			state={data}
		>
			<Card
				image={artwork}
				header={name}
				meta={'by ' + artistName}
				extra={
					<div>
						<b>Description:</b>
						<div>{description}</div>
					</div>
				}
			/>
		</Link>
	);
};
export default PodcastInfo;
