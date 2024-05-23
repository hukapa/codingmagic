// // src/routes/+layout.server.ts
// import type { LayoutServerLoad } from './$types'

// export const load = (async ({ locals: { safeGetSession } }:any) => {
//   const { session, user } = await safeGetSession()

//   return {
//     session,
//     user,
//   }
// }) satisfies LayoutServerLoad