
import React, { Fragment, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux'

import Spinner from '../../components/layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../redux/actions';

const Profiles = () => {
    const dispatch = useDispatch()
    const profileInfo = useSelector(store => store.profile)
    const loading = profileInfo.loading
    const profiles = profileInfo.profiles

    useEffect(() => {
        dispatch(getProfiles());
    }, [getProfiles]);

    return loading ? (
            <Spinner/>
        ) : (
            <Fragment>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop' /> Browse and connect with
                developers
            </p>
            <div className='profiles'>
                {profiles && profiles.length > 0 ? (
                profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ))
                ) : (
                    <h4>No profiles found..</h4>
                )}
            </div>
            </Fragment>
    );
};

export default Profiles;