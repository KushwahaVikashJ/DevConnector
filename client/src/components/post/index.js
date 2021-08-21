import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import Spinner from '../../components/layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../redux/actions';

const Post = (props) => {
    const dispatch = useDispatch()
    const postInfo = useSelector(store => store.posts)
    const loading = postInfo.loading
    const post = postInfo?.post 
    useEffect(() => {
        dispatch(getPost(props?.match?.params?.id));
    }, [getPost,props?.match?.params?.id]);

    return loading || post === null ? (
        <Spinner />
    ) : (
    <Fragment>
        <Link to='/posts' className='btn'>
            Back To Posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className='comments'>
            {post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>
  );
};

export default Post;