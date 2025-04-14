import { gql } from "@apollo/client";

export const SEARCH_USER_REPOS = gql`
    query SearchUserRepos(
        $username: String!
        $first: Int = 10
        $orderBy: RepositoryOrder = { field: STARGAZERS, direction: DESC }
    ){
        user(login: $username) {
            name
            avatarUrl
            repositories(first: $first, orderBy: $orderBy) {
                nodes {
                    name
                    description
                    stargazerCount
                    url
                }
            }
        }
    }
`;
