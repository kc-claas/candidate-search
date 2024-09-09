import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
// import { json } from 'react-router-dom';

const CandidateSearch = () => {

  // set stats
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [current, setCurrent] = useState(0)
  const [candidate, setCandidate] = useState<Candidate>()
  

  const getUserArray = async ()=>{ 
    const users:Candidate[] = await searchGithub();
    setCandidates(users);
  };

  const getUser = async ()=>{
    try {    
      const user:Candidate = await searchGithubUser(candidates[current].login);
      if (user.login) {
        setCandidate(user)
      }
      else {
        console.log(`couldn't fetch profile from github api, skipping to next`); 
        setCurrent(current+1)
      }
    } catch (error) {
      setCandidate(undefined)
    }
  }
  useEffect(()=> {getUserArray()},[]);

  useEffect(()=> {getUser()},[current,candidates])


  // button handlers
  const handleDiscard = () => {
    setCurrent(current + 1)
  }

  const handleSave = () => {
    if (localStorage.getItem('candidates')) 
      {const array: Candidate[] = JSON.parse(localStorage.getItem('candidates')!)
        array.push(candidate!)
        localStorage.setItem('candidates', JSON.stringify(array))
      }
    else {const array: Candidate[] = []
      array.push(candidate!)
      localStorage.setItem('candidates', JSON.stringify(array))
    }
    setCurrent(current +1)
  }


  return (
    <div className='container'>
      <h1>Candidate Search</h1>
      {candidate ? 
        ( <section className='candidate-container'>
            <div className='candidate'>
              <img className='candidate-img' src={candidate.avatar_url} alt="avatar"/>
              <div className='candidate-info'> 
                <p>{candidate.name} <span>({candidate.login})</span></p>
                <a href={`${candidate.html_url}`}>({candidate.html_url})</a>
                <p>Location: {candidate.location}</p>
                <p>Email: {candidate.email}</p>
                <p>Company: {candidate.company}</p>
                <p>Bio: {candidate.bio}</p>
              </div>
            </div>
            <div className='btn-container'>
              <button className="reject-btn" onClick={handleDiscard}>-</button>
              <button className="accept-btn" onClick={handleSave}>+</button>
            </div>
          </section>)
      : (current >= candidates.length) && (candidates.length > 0)? (<p className='error-p'>No more candidates available</p>)
      : <></>
      }
    </div>
  );
};

export default CandidateSearch;
