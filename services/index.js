import { request, gql } from 'graphql-request';

// takes env from .env in main folder
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Queries the graphQL CMS for relevant fields
export const getPosts = async () => {
    const query = gql`
        query Authors {
            posts {
                id
            }
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `

    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges; 
};

// Queries the graphQL CMS for three most recent posts
export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3 
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);
    return result.posts; 
};

// Queries the graphQL CMS for three similar posts not including the current post
export const getSimilarPosts = async () => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND:{ categories_some: { slug_in: $categories }}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);
    return result.posts;
}
