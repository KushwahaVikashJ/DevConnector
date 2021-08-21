import React, { useEffect,Fragment } from 'react';
import { useDispatch,useSelector } from 'react-redux'

import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../redux/actions'

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch()
  const profileInfo = useSelector(store => store.profile)
  const repos = profileInfo.repos
  const loading = profileInfo.loading
  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [getGithubRepos,username]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {repos && repos.length > 0 ? 
          (repos.map(repo => (
            <div key={repo.id} className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className='badge badge-primary'>
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className='badge badge-dark'>
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className='badge badge-light'>Forks: {repo.forks_count}</li>
                </ul>
              </div>
            </div>
          ))):(
              <h4>No Repos Found</h4>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ProfileGithub;