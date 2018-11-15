import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <h4></h4>
    <h4>Top repos sorted by number of forks:</h4>
    <ul>{props.links}</ul>
  </div>
)

export default RepoList;