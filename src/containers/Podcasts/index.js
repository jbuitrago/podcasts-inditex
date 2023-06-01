import { useEffect, useCallback, useState } from 'react';
import api from '../../backend/apiPodcast';
import {
	getLocalStorageWithExpiry,
	setLocalStorageWithExpiry,
} from '../../utils/cache';
import { timeExpiry, podcastsKey } from '../../utils/costants';
import PodcastItem from '../../components/Podcasts/PodcastItem';

import { Input, Grid, Segment, Placeholder } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
// Redux Toolkit
// Activar o desactivar loading en el header
import { activate, deactivate } from '../../features/podcast/loadingSlice';
// Actualizar el tecto del filtro y el resultado
import { saveFilterInfo } from '../../features/podcast/filterSlice';

/**
 *
 * @returns
 * @description : Contenedor principal , consulta el api api.podcasts.getAll y muestra el listado de los 100 mejores podcast
 */
const Podcasts = () => {
	const [podcasts, setPodcasts] = useState([]);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const filterInfo = useSelector(state => state.filter.value);

	// Usamos useCallback para evitar loop infinito
	const fetch = useCallback(() => {
		// Si existe la variable en el localStorage creo el estado
		// Si no existe la variable de session consulto el api
		dispatch(activate());

		if (!getLocalStorageWithExpiry(podcastsKey)) {
			if (podcasts.length === 0) {
				api.podcasts.getAll().then(podcasts => {
					console.log(podcasts);
					if (!podcasts) {
						console.log('No hay datos');
						setLoading(false);
						dispatch(deactivate());
						return;
					}
					if (podcasts) {
						// Actualizamos el estado
						setPodcasts(podcasts);
						// Creamos la variable en el localStorage
						setLocalStorageWithExpiry(podcastsKey, podcasts, timeExpiry);
						setLoading(false);
						dispatch(deactivate());
						dispatch(saveFilterInfo({ filter: '', filterPodcasts: podcasts }));
					}
				});
				setLoading(false);
			}
		} else {
			setPodcasts(getLocalStorageWithExpiry(podcastsKey));
			setLoading(false);
			dispatch(deactivate());
			if (filterInfo.filter === '' || filterInfo.filter === null) {
				dispatch(
					saveFilterInfo({
						filter: '',
						filterPodcasts: getLocalStorageWithExpiry(podcastsKey),
					})
				);
			}
		}
	}, []);

	useEffect(() => {
		fetch();
	}, [fetch]);

	const onChange = e => {
		const updatedList = podcasts.filter(
			podcast =>
				podcast.author.toLowerCase().search(e.target.value.toLowerCase()) !==
					-1 ||
				podcast.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
		);
		// Actualizar in
		dispatch(
			saveFilterInfo({ filter: e.target.value, filterPodcasts: updatedList })
		);
	};

	const listPodcasts = filterInfo.filterPodcasts.map(podcast => {
		return (
			<Grid.Column width={4} key={podcast.id}>
				{loading ? (
					<Segment raised>
						<Placeholder>
							<Placeholder.Header image>
								<Placeholder.Line />
								<Placeholder.Line />
							</Placeholder.Header>
							<Placeholder.Paragraph>
								<Placeholder.Line length="medium" />
								<Placeholder.Line length="short" />
							</Placeholder.Paragraph>
						</Placeholder>
					</Segment>
				) : (
					<PodcastItem data={podcast} key={podcast.id} />
				)}
			</Grid.Column>
		);
	});

	return (
		<div>
			{loading === true && (
				<Segment raised>
					<Placeholder>
						<Placeholder.Header image>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
						<Placeholder.Paragraph>
							<Placeholder.Line length="medium" />
							<Placeholder.Line length="short" />
						</Placeholder.Paragraph>
					</Placeholder>
				</Segment>
			)}
			<Grid columns={4} padded>
				<Input
					type="filter"
					placeholder="Filter podcasts..."
					onChange={onChange}
					value={filterInfo.filter}
				/>
			</Grid>
			<Grid columns={4} padded centered>
				{listPodcasts}
			</Grid>
		</div>
	);
};

export default Podcasts;
