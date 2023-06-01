import { Routes, Route } from 'react-router-dom';
import ROUTES from '../../utils/routes';
import Podcasts from '../Podcasts';
import PodcastContainer from '../Podcasts/PodcastContainer';
import PodcastEpisode from '../../components/Podcasts/PodcastEpisode';
import PodcastHeader from '../Header';
import Error404 from '../../containers/Error';
import Footer from '../Footer';

/**
 *
 * @returns
 */
const App = () => {
	return (
		<div className="ui container">
			<PodcastHeader />
			<Routes>
				<Route exact path={ROUTES.PODCASTS} element={<Podcasts />} />

				<Route
					exact
					path={`/${ROUTES.PODCAST}/:podcastId`}
					element={<PodcastContainer />}
				></Route>
				<Route
					exact
					path={`/${ROUTES.PODCAST}/:podcastId/${ROUTES.PODCASTEPISODE}/:episodeId`}
					element={<PodcastEpisode />}
				/>
				<Route path="*" component={<Error404 />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
