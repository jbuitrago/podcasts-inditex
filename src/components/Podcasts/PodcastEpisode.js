import { useLocation } from 'react-router-dom';
import { Grid, Placeholder, Segment } from 'semantic-ui-react';
import PodcastInfo from '../../components/Podcasts/PodcastInfo';

/**
 *
 * @param {*} param0 }
 * @description Muestra el episodio y permite escuchar el audio
 * @returns
 */
const PodcastEpisode = () => {
	const location = useLocation();
	const { podcastDetails, loading, episode } = location.state;
	const { content, title, url } = episode;

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
				<Segment>
					<h2>{title}</h2>
					<div
						dangerouslySetInnerHTML={{
							__html: content,
						}}
					/>
					<div className="ui divider" />
					<div className="ui column centered grid padded">
						<audio controls>
							<source src={url} type="audio/ogg" />
							<source src={url} type="audio/mpeg" />
							<source src={url} type="audio/mp3" />
							Your browser does not support the audio element.
						</audio>
					</div>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};
export default PodcastEpisode;
