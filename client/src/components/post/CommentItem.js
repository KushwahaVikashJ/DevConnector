import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import Moment from 'react-moment';
import { deleteComment } from '../../redux/actions';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) =>{
    const dispatch = useDispatch()
    return (
    <div className='post bg-white p my'>
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
        {/* {!auth.loading && user === auth.user._id && ( */}
          <button
            onClick={() => dispatch(deleteComment(postId, _id))}
            type='button'
            className='btn btn-danger'
          >
            Delete
            {/* <i className='fas fa-times' /> */}
          </button>
        {/* )} */}
      </div>
    </div>
  )
} 

export default CommentItem;