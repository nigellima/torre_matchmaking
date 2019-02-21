import { GET_MATCH_SKILLS } from './types';
import axios from '../utils/axios';

// Get Matched Skills
export const getMatchedSkills = (value) => dispatch => {
  console.log(value)
  axios
    .get(`/api/skills/${value}`)
    .then(res =>
      dispatch({
        type: GET_MATCH_SKILLS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_MATCH_SKILLS,
        payload: []
      })
    }
      
    );
};