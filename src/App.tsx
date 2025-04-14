import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USER_REPOS } from "./graphql/queries";
import "./App.css";

function App() {
    const [username, setUsername] = useState("");
    const [repoCount, setRepoCount] = useState(10); // Default to 10 repositories
    const [orderField, setOrderField] = useState("STARGAZERS"); // Default to STARGAZERS
    const [orderBy, setOrderBy] = useState("DESC"); // Default to 10 repositories
    const [search, { data, loading, error }] = useLazyQuery(SEARCH_USER_REPOS);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            search({
                variables: {
                    username,
                    first: parseInt(repoCount.toString(), 10),
                    orderBy: { field: orderField, direction: orderBy },
                },
            });
        }
    };

    return (
        <div>
            <h1>GitHub User Repo Search</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">GitHub Username:</label>
                <input
                    id="username"
                    className="formField"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                />

                <label htmlFor="repoCount">Number of Repositories:</label>
                <input
                    id="repoCount"
                    className="formField"
                    type="number"
                    value={repoCount}
                    onChange={(e) => setRepoCount(Number(e.target.value))}
                    placeholder="Number of repositories"
                    min="1"
                />

                <label htmlFor="orderField">Order By:</label>
                <select
                    id="orderField"
                    className="formField"
                    value={orderField}
                    onChange={(e) => setOrderField(e.target.value)}
                >
                    <option value="STARGAZERS">Stars</option>
                    <option value="CREATED_AT">Created Date</option>
                    <option value="UPDATED_AT">Last Updated</option>
                </select>

                <select
                    className="formField"
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                >
                    <option value="DESC">Descending</option>
                    <option value="ASC">Ascending</option>
                </select>

                <button type="submit" className="formField">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            {data?.user && (
                <div>
                    <ul>
                        {data.user.repositories.nodes.map((repo: any) => (
                            <li key={repo.name}>
                                <a href={repo.url} target="_blank" rel="noreferrer">
                                    <strong>{repo.name}</strong> — ⭐ {repo.stargazerCount}
                                </a>
                                <p>{repo.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
