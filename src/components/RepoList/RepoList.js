import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import styles from './RepoList.module.css';
import axios from 'axios'


const RepoList = () => {
    const [repos, setRepos] = useState([]);
    const [query, setQuery] = useState('vanilla');
    const [toggleSort, setToggleSort] = useState('alphabet');

    const sort = () => setToggleSort('star');

    useEffect(() => {
        axios
            .get(`https://api.github.com/users/${query}/repos`)
            .then(response => setRepos(response.data));
    }, [query]);
        
    const repoList = repos
        .map(r=> {
            return (
                <div className="col-4" key={r.id}>
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
                            <input className="form-control mr-sm-2" type="search" placeholder="Search Users/Orgs" aria-label="Search" onChange={e => setQuery(e.target.value)} value={query} />
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
                            <label className={`btn btn-outline-dark ${toggleSort === 'alphabet' ? 'active' : ''}`}>
                                <input type="radio" name="options" id="option1" onClick={sort}/> <span>Alphabetical</span>
                            </label>
                            <label className={`btn btn-outline-dark ${toggleSort === 'star' ? 'active' : ''}`}>
                                <input type="radio" name="options" id="option2"  onClick={sort}/> <span>By Most Stars</span>
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


