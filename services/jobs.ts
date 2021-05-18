import { request, gql } from 'graphql-request'

/**
 * This function will fetch the list of jobs from GraphQL jobs.
 */
export const jobsFetcher = async () => {
  const endpoint = 'https://api.graphql.jobs/'
  
  const query = gql`
    {
      jobs {
        id
        title
        company {
          name
          logoUrl
        }
        commitment {
          title
        }
        tags {
          id
          name
        }
        postedAt
        cities {
          name
        }
        commitment {
          title
        }
      }
    }
  `
  
  return await request(endpoint, query)
}
