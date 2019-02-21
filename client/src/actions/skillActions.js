import { GET_MATCH_SKILLS } from './types';
import axios from 'axios';

// Get Matched Skills
export const getMatchedSkills = (value) => dispatch => {
  axios
    .get(`/api/skills/${value}`)
    .then(res =>
      dispatch({
        type: GET_MATCH_SKILLS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MATCH_SKILLS,
        payload: null
      })
    );
};