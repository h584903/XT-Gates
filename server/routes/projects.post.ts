// projects.post.ts 
export default defineEventHandler(async event => {
  const body = await readBody (event)

  return {updated: true}
})
