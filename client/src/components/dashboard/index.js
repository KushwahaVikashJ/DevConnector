import React,{Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import { getCurrentProfile } from '../../redux/actions' 
import { deleteAccount } from '../../redux/actions'
import DashboardActions from './DashboardActions'
import Spinner from '../../components/layout/Spinner'
import Experience from './Experience'
import Education from './Education'
  
const  Dashboard = () => {
    const profileInfo = useSelector(store => store.profile)
    const userInfo = useSelector(store => store.user)
    const user = userInfo.user
    const loading = profileInfo.loading
    const profile = profileInfo.profile
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [getCurrentProfile])

    return loading && profile == null? (
    <Spinner/>
    ):( 
    <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
  
            <div className='my-2'>
              <button 
                onClick={() => dispatch(deleteAccount())}
                className='btn btn-danger' >
                <i className='fas fa-user-minus' /> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
        )}
    </Fragment>
    )
}

export default Dashboard
