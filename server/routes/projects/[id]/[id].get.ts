// routes/projects/[id].get.ts
export default defineEventHandler (async (event) => {
	const id = getRouterParam(event, 'id')

	return 'individual project!'
})
