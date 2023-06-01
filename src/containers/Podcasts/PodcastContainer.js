import { useEffect, useCallback, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PodcastDetails from '../../components/Podcasts/PodcastDetails';
import api from '../../backend/apiPodcast';
import { timeExpiry, podcastKey } from '../../utils/costants';
import {
	getLocalStorageWithExpiry,
	setLocalStorageWithExpiry,
} from '../../utils/cache';
import { useDispatch } from 'react-redux';
import { activate, deactivate } from '../../features/podcast/loadingSlice';

/**
 *
 * @returns
 * @description : Contenedor principal del detalle, consulta el api de api.podcasts.getPodcast y muestra el detalle del podcast
 */
const PodcastContainer = props => {
	const [loading, setLoading] = useState(true);
	const [podcastDetails, setPodcastDetails] = useState([]);
	const routeParams = useParams();
	const { podcastId } = routeParams;
	const location = useLocation();
	const podcastFinalKey = `${podcastKey}_${podcastId}`;
	const dispatch = useDispatch();
	const fetch = useCallback(() => {
		dispatch(activate());
		if (!getLocalStorageWithExpiry(podcastFinalKey)) {
			if (podcastDetails.length === 0 && podcastId !== null) {
				api.podcasts.getPodcast(podcastId).then(podcast => {
					podcast.description = '';
					podcast.episodes = null;
					api.podcasts.getEpisodes(podcast).then(episodes => {
						if (!episodes) {
							console.log('Error at fetching episodes');
							setLoading(false);
							dispatch(deactivate());
						}
						podcast.description = location.state.summary;
						podcast.episodes = episodes;
						setPodcastDetails(podcast);
						setLocalStorageWithExpiry(podcastFinalKey, podcast, timeExpiry);
						setLoading(false);
						dispatch(deactivate());
					});
				});
			}
		} else {
			setPodcastDetails(getLocalStorageWithExpiry(podcastFinalKey));
			setLoading(false);
			dispatch(deactivate());
		}
	}, []);

	useEffect(() => {
		fetch();
	}, [fetch]);
	return (
		<>
			{podcastDetails.episodes && (
				<PodcastDetails
					poscatId={podcastId}
					podcastDetails={podcastDetails}
					loading={loading}
				/>
			)}
		</>
	);
};

export default PodcastContainer;
