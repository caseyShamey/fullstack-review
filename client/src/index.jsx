import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      links: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    $.post("/repos", {userName: term}, () => {
      this.list();
    });
  }

  componentDidMount() {
    this.list();
  }

  // ComponentWillUnmount() {


  // }

  list () {
    $.get("/repos", (data) => {
      this.setState({
        repos: data,
        links: data.map((repo) => <li><a href={repo.url}>{repo.repoName}</a></li>)
      })
      console.log(this.state.links)
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} links={this.state.links}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));