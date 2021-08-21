import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch } from 'react-redux'

import { deleteExperience } from '../../redux/actions';

const Experience = (props) => {
    const dispatch = useDispatch()

    const experiences = props?.experience?.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="DD/MM/YYYY">{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="DD/MM/YYYY">{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperience(exp._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table" style={{width:'100%'}}>
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience

