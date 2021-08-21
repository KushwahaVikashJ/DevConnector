import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../redux/actions';

const Profile = (props) => {
    const dispatch = useDispatch()
    const profileInfo = useSelector(store => store.profile)
    const userInfo = useSelector(store => store.user)
    const loading = profileInfo.loading
    const profile = profileInfo.profile
    
    useEffect(() => {
        dispatch(getProfileById(props?.match?.params?.id));
    }, [getProfileById,props?.match?.params?.id]);

    return (
    <Fragment>
      {profileInfo.profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
            {userInfo.isAuthenticated &&
            userInfo.loading === false &&
            userInfo?.user?._id === profile?.user?._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
            <div className='profile-grid my-1'>
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'>Experience</h2>
                {profile.experience.length > 0 ? (
                    <Fragment>
                    {profile.experience.map(experience => (
                        <ProfileExperience
                        key={experience._id}
                        experience={experience}
                        />
                    ))}
                    </Fragment>
                ) : (
                    <h4>No experience credentials</h4>
                )}
                </div>

                <div className='profile-edu bg-white p-2'>
                <h2 className='text-primary'>Education</h2>
                {profile.education.length > 0 ? (
                    <Fragment>
                    {profile.education.map(education => (
                        <ProfileEducation
                        key={education._id}
                        education={education}
                        />
                    ))}
                    </Fragment>
                ) : (
                    <h4>No education credentials</h4>
                )}
                </div>

                {profile.githubusername && (
                    <ProfileGithub username={profile.githubusername}/>
                )}
            </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;