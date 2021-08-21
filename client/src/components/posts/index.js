import React, { Fragment, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getAllPost } from '../../redux/actions';

const Posts = () => {
    const dispatch = useDispatch()
    const postsInfo = useSelector(store => store.posts)
    const loading = postsInfo.loading
    const posts = postsInfo?.posts?.postData ? postsInfo?.posts?.postData : postsInfo?.posts

    useEffect(() => {
        dispatch(getAllPost());
    }, [getAllPost]);

    return  loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome to the community
            </p>
            <PostForm />
            <div className='posts'>
                {posts && posts.map(post => (
                    <PostItem key={post._id} post={post} showActions={true}/>
                ))}
            </div>
        </Fragment>
  );
};

export default Posts;