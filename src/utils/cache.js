/**
 * Crea variable de session con duracion tiempo ttl
 */
export const setLocalStorageWithExpiry = (key, value, ttl) => {
	const now = new Date();
	const item = {
		value,
		expiry: now.getTime() + ttl,
	};

	localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Valida si la variable de session existe o si ya caducó
 */
export const getLocalStorageWithExpiry = key => {
	const itemStr = localStorage.getItem(key);

	if (!itemStr) {
		return null;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();

	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};
