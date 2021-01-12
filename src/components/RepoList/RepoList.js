import React, { useState } from 'react';
import Card from '../Card/Card';
import styles from './RepoList.module.css';
import axios from 'axios'


const RepoList = () => {
    const [repos, setRepos] = useState([]);
    const [query, setQuery] = useState("vanilla");
    const [toggleSort, setToggleSort] = useState('alphabetical');

    const sort = () => setToggleSort(toggleSort === 'alphabetical' ? 'bystar' : 'alphabetical');
    
    const search = queryValue => {
        axios
            .get(`https://api.github.com/users/${queryValue}/repos`)
            .then(response => setRepos(response.data))
            .catch(err => {
                console.log(err.response.data.error);
            });
    };

    const handleSearchChange = (e) => setQuery(e.target.value);

    const resetSearchBox = () => setQuery("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        search(query);
        resetSearchBox();
    }

    const repoList = repos
        
        .map(r=> {
            return (
                <div className="col-sm-12 col-lg-4 col-md-6" key={r.id}>
                    <Card 
                        name={r.full_name} 
                        stargazers={r.stargazers_count} 
                        watcher={r.watchers} 
                        description={r.description}
                    />
                </div>
            );
        });

    return (
        <React.Fragment>
            <div className={styles.Search}>
                <div className="container">
                    <nav className="navbar navbar-dark bg-dark">
                        <h1 className="navbar-brand">Github Repo Lister</h1>
                        <form className="form-inline">
                            <input 
                                className="form-control mr-sm-2" 
                                type="text" 
                                placeholder="Search Users/Orgs" 
                                onChange={handleSearchChange} 
                                value={query} 
                            />
                            <input 
                                className="btn btn-light my-2 my-sm-0"
                                type="submit" 
                                value="Search"
                                onClick={handleSearchSubmit} 
                            />
                        </form>
                    </nav>
                </div>
            </div>
            <div className={styles.RepoList}>
                <div className="container">
                    <h4 className="mb-3 mt-5">Listing repositories for the user "{query}":</h4>
                    <div className={styles.sortButton}>
                        <div className="mr-3"><p>Sort by</p></div>
                        <div className="btn-group btn-group-toggle mb-3" data-toggle="buttons">
                            <label className={`btn btn-outline-dark ${toggleSort === 'alphabetical' ? 'active' : ''}`}>
                                <input type="radio" name="sortOption" id="alphabetical" onClick={sort}/> <span>Alphabetical</span>
                            </label>
                            <label className={`btn btn-outline-dark ${toggleSort === 'bystar' ? 'active' : ''}`}>
                                <input type="radio" name="sortOption" id="bystar"  onClick={sort}/> <span>By Most Stars</span>
                            </label>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            {repoList}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RepoList;


