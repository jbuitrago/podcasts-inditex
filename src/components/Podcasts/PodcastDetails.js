import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Placeholder, Table, Pagination } from 'semantic-ui-react';
import ROUTES from '../../utils/routes';
import PodcastInfo from '../../components/Podcasts/PodcastInfo';

const TAM_PAGE = 10;

const dateParser = dateString => {
	const milliseconds = Date.parse(dateString);
	const date = new Date(milliseconds);

	return (
		date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
	);
};
/**
 *
 * @param {*} param0 }
 * @description Muestra el detalle de un podcast
 * @returns
 */
const PodcastDetails = ({ poscatId, podcastDetails, loading }) => {
	const [activePage] = useState(1);
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(10);
	console.log('episodes:', podcastDetails.episodes);
	const { episodes } = podcastDetails;
	const onPageChange = (event, data) => {
		const start = (data.activePage - 1) * TAM_PAGE;
		const end = start + TAM_PAGE;
		setStart(start);
		setEnd(end);
	};

	return (
		<Grid>
			<Grid.Column width={4}>
				{loading ? (
					<Placeholder>
						<Placeholder.Image square />
					</Placeholder>
				) : (
					<PodcastInfo data={podcastDetails} />
				)}
			</Grid.Column>
			<Grid.Column width={12}>
				<Table celled padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell width={8}>Title</Table.HeaderCell>
							<Table.HeaderCell width={2}>Date</Table.HeaderCell>
							<Table.HeaderCell width={2}>Duration</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{episodes !== null &&
							episodes.slice(start, end).map((episode, index) => {
								return (
									<Table.Row key={index}>
										<Table.Cell>
											<Link
												to={{
													pathname: `/${ROUTES.PODCAST}/${poscatId}/${ROUTES.PODCASTEPISODE}/${episode.id}`,
												}}
												state={{
													episodes,
													podcastDetails,
													loading,
													episode,
													poscatId,
												}}
											>
												{episode.title}
											</Link>
										</Table.Cell>
										<Table.Cell>{dateParser(episode.date)}</Table.Cell>
										<Table.Cell>{episode.duration}</Table.Cell>
									</Table.Row>
								);
							})}
					</Table.Body>
				</Table>
				<Pagination
					className="ui right floated"
					defaultActivePage={activePage}
					totalPages={Math.ceil(episodes.length / TAM_PAGE)}
					onPageChange={onPageChange}
				/>
			</Grid.Column>
		</Grid>
	);
};
export default PodcastDetails;
