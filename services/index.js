import { request, gql } from 'graphql-request';

// takes env from .env in main folder
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Queries the graphQL CMS for relevant fields
export const getPosts = async () => {
    const query = gql`
        query Authors {
            posts(first:500) {
                id
                hiddenPost
            }
            postsConnection(first:500) {
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
                        hiddenPost
                    }
                }
            }
        }
    `

    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges; 
};

// Queries the graphQL CMS for relevant fields
export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                author {
                    bio
                    richbio {
                        raw
                    }
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
                content {
                    raw
                }
            }              
        }
    `

    const result = await request(graphqlAPI, query, { slug });
    return result.post; 
};

// Queries the graphQL CMS for three most recent posts
export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3 
                where: { hiddenPost_not: true }
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
export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, hiddenPost_not: true, AND:{ categories_some: { slug_in: $categories }}}
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

    const result = await request(graphqlAPI, query, { categories, slug });
    return result.posts;
}

// Queries the graphQL CMS for all categories
export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query);
    return result.categories;
}

export const getCategoryPost = async (slug) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: {categories_some: {slug: $slug}}) {
                edges {
                    cursor
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
                        hiddenPost
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query, { slug });

    return result.postsConnection.edges;
}

// Submit a comment to the api backend
export const submitComment = async ({ obj }) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(obj), 
    });

    return result.json();
}
