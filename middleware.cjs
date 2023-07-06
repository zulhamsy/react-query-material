/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const jsonServer = require('json-server')

const routes = jsonServer.router('src/data/compile.json')

module.exports = (req, res, next) => {
	const data = routes.db.getState()
	const resource = req.path.split('/')[1]
	const queryId = req.query.id

	if (!(resource in data)) {
		return setTimeout(() => res.status(500).json({
			error: 'Resource not found'
		}), 1500)
	}

	// Check if the data is empty array or null
	const requestedData = data[resource].find((item) => item.id === queryId);
	if (queryId && !requestedData) {
		// Data is empty array or null, send a 400 response
		return setTimeout(() => res.status(404).json({
			error: `Data for resource '${resource}' is empty or null`,
		}), 1500);
	}

	// Check if 'X-Error' header is true
	const isError = req.headers['x-error'] === 'true';

	// Randomly decide whether to respond with an error or proceed
	const shouldError = Math.random() < 0.75; // 90% chance of error

	if (isError && shouldError) {
		return setTimeout(() => res.status(500).json({
			error: 'Random error occurred',
		}), 1500);
	}

	next()
}