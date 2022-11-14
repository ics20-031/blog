// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * All files in /pages/api are mapped to /api/* and will be treated as an API endpoint
 * instead of a page.
 */
import type { NextApiRequest, NextApiResponse } from 'next'
// import { GraphQLClient, gql } from 'graphql';

// const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

// export default function comments(req, res) {
//   const graphQLClient = new GraphQLClient(graphqlAPI, {
//     headers: {
//       authorization: `Bearer ${process.env}`
//     }
//   })
// }
