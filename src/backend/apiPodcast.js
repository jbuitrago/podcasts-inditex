import axios from 'axios';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

/**
 * @description : Este Backend hace todas las consultas al api utilizando el CORS proxy.
 */
export default {
	podcasts: {
		getAll: () =>
			axios
				.get(
					`${CORS_PROXY}https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
				)
				.then(res => {
					const podcasts = [];
					res.data.feed.entry.forEach(p => {
						const podcast = {
							id: p.id.attributes['im:id'],
							img: p['im:image'][2].label,
							name: p['im:name'].label,
							author: p['im:artist'].label,
							summary: p.summary ? p.summary.label : 'No description',
						};
						podcasts.push(podcast);
					});
					return podcasts;
				})
				.catch(error => console.log(`Error at fetching podcasts: ${error}`)),

		getPodcast: podcastId =>
			axios
				.get(`${CORS_PROXY}https://itunes.apple.com/lookup?id=${podcastId}`)
				.then(res => {
					const p = res.data.results[0];
					const podcast = {
						id: p.trackId,
						artwork: p.artworkUrl600,
						name: p.trackName,
						feedUrl: p.feedUrl,
						artistName: p.artistName,
					};
					return podcast;
				})
				.catch(error => console.log(`Error at fetching podcast: ${error}`)),

		getEpisodes: async podcast => {
			const episodes = [];
			// Axios feed rss
			const feed = await axios
				.get(`${CORS_PROXY}${podcast.feedUrl}`, {
					decompress: true,
					headers: { Accept: 'text/xml,application/xhtml+xml,application/xml' },
					responseType: 'text',
				})
				.catch(error => {
					console.log(`Error at fetching episodes: ${error}`);
					return error;
				});

			if (feed === undefined || feed.data === undefined || feed.data === null) {
				return episodes;
			}

			const parser = new DOMParser();
			const doc = parser.parseFromString(feed.data, 'application/xml');
			// Recorrer todos los items
			const items = doc.querySelectorAll('item');

			items.forEach(item => {
				// Validar elementos que no existen
				const duration =
					item.getElementsByTagName('itunes:duration')[0] !== undefined
						? item.getElementsByTagName('itunes:duration')[0].textContent
						: '';
				const content =
					item.getElementsByTagName('content:encoded')[0] !== undefined
						? item.getElementsByTagName('content:encoded')[0].textContent
						: '';
				const url =
					item.querySelector('enclosure') !== null
						? item.querySelector('enclosure').getAttribute('url')
						: '';
				// Llenar array para tabla de episodios
				episodes.push({
					id: item.querySelector('guid').firstChild.nodeValue,
					title: item.querySelector('title').firstChild.nodeValue,
					date: item.querySelector('pubDate').firstChild.nodeValue,
					duration,
					content,
					url,
				});
			});
			return episodes;
		},
	},
};
