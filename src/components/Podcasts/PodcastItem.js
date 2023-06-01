import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import ROUTES from '../../utils/routes';

/**
 *
 * @param {*} param0 }
 * @description Muestra cada cajita con la informacion de cada podcast en la pagina principal
 * @returns
 */
const PodcastItem = ({ data }) => {
	const { id, name, img, author } = data;

	return (
		<Link
			to={{
				pathname: `/${ROUTES.PODCAST}/${id}`,
			}}
			state={data}
		>
			<Card>
				<Image src={img} circular wrapped ui={false} />
				<Card.Content>
					<Card.Header>{name}</Card.Header>
					<Card.Meta>
						<span>Author: {author}</span>
					</Card.Meta>
				</Card.Content>
			</Card>
		</Link>
	);
};

export default PodcastItem;
