import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../redux/actions';

const PostItem = ({ post: { _id, text, name, avatar, user, likes, comments, date },showActions}) => {
    const dispatch = useDispatch()
    // const userInfo = useSelector(store => store.user)  
    // const auth = userInfo.user
    // const loading = userInfo.loading
    return(
        <div className='post bg-white p-1 my-1'>
            <div>
            <Link to={`/profile/${user}`}>
                <img className='round-img' src={avatar} alt='' />
                <h4>{name}</h4>
            </Link>
            </div>
            <div>
            <p className='my-1'>{text}</p>
            <p className='post-date'>
                Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
            </p>
            {showActions && (
                <Fragment>
                <button
                    onClick={() => dispatch(addLike(_id))}
                    type='button'
                    className='btn btn-light'
                >
                    <i className='fas fa-thumbs-up' />{' '}
                    <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button>
                <button
                    onClick={() => dispatch(removeLike(_id))}
                    type='button'
                    className='btn btn-light'
                >
                    <i className='fas fa-thumbs-down' />
                </button>
                <Link to={`/posts/${_id}`} className='btn btn-primary'>
                    Discussion{' '}
                    {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                    )}
                </Link>
                {/* {!loading && user === auth._id && ( */}
                    <button
                    onClick={() => dispatch(deletePost(_id))}
                    type='button'
                    className='btn btn-danger'
                    >
                        Delete
                    {/* <i className='fas fa-times' /> */}
                    </button>
                {/* )} */}
                </Fragment>
            )} 
            </div>
        </div>
)};

export default PostItem;