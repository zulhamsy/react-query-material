import jsonServer from 'json-server'

const server = jsonServer.create()
const routes = jsonServer.router('src/data/compile.json')
const middlewares = jsonServer.defaults()

// custom middleware
server.use((req, res, next) => {
	const data = routes.db.getState()
	const resource = req.path.substring(1)
	const queryId = req.query.id

	if (!(resource in data)) {
		return setTimeout(() => res.status(500).setHeader('Access-Control-Allow-Origin', 'http://localhost:5173').send({
			error: 'Resource not found'
		}), 1500)
	}

	// Check if the data is empty array or null
	const requestedData = data[resource].find((item) => item.id === queryId);
	if (queryId && !requestedData) {
		// Data is empty array or null, send a 400 response
		return setTimeout(() => res.status(404).setHeader('Access-Control-Allow-Origin', 'http://localhost:5173').send({
			error: `Data for resource '${resource}' is empty or null`,
		}), 1500);
	}

	setTimeout(() => next(), 1500)
})

server.use(middlewares)
server.use(routes)
server.listen(3000, () => console.log('JSON Server is running'))
