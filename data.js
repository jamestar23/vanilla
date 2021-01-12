const repo = [
    {
        id: 1,
        full_name: "vanilla/addons",
        stargazers_count: 302,
        watchers: 81
    }, 
    {
        id: 2,
        full_name: "vanilla/vanilla",
        stargazers_count: 455,
        watchers: 203
    }, 
    {
        id: 3,
        full_name: "vanilla/addon-forks",
        stargazers_count: 310,
        watchers: 151
    }, 
    {
        id: 4,
        full_name: "vanilla/prettier-config",
        stargazers_count: 170,
        watchers: 89
    }, 
    {
        id: 5,
        full_name: "vanilla/babel-preset",
        stargazers_count: 189,
        watchers: 35
    }, 
    {
        id: 6,
        full_name: "vanilla/garden-schema",
        stargazers_count: 280,
        watchers: 112
    }, 
    {
        id: 7,
        full_name: "vanilla/garden-container",
        stargazers_count: 102,
        watchers: 27
    }, 
    {
        id: 8,
        full_name: "vanilla/pquery",
        stargazers_count: 81,
        watchers: 19
    }
];

const repoList = repo
    .sort((a, b) => (a.full_name > b.full_name) ? 1 : (a.full_name === b.full_name) ? ((a.stargazers_count > b.stargazers_count) ? 1 : -1) : -1 )
    .map(r=> {
        return (
            <div className="col-sm-12 col-lg-4 col-md-6" key={r.id}>
                <Card 
                    name={r.full_name} 
                    stargazers={r.stargazers_count} 
                    watcher={r.watchers} 
                    description="Official add-ons and tools for Vanilla Forums. This is the description of the repository. It can be long or it can be short. Be sure the text doesn’t get cutoff."
                />
            </div>
        );
    });