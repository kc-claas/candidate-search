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
      setCandidate(user);
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
    <div>
      <h1>Candidate Search</h1>
      { candidate? 
        (candidate.login? (
          <section>
            <img src={candidate.avatar_url}/>
            <p>{candidate.name} <span>({candidate.login})</span></p>
            <p>Location:{candidate.location}</p>
            <p>Email:{candidate.email}</p>
            <p>Company:{candidate.company}</p>
            <p>Bio:{candidate.bio}</p>
            <button onClick={handleDiscard}>-</button>
            <button onClick={handleSave}>+</button>
          </section>)
        :(
          <>
            <p>Whoops! No profile found, try again.</p> 
            <button onClick={handleDiscard}>-</button>
          </>
        ))
      : (<p>No more candidates available</p>)}
    </div>
  );
};

export default CandidateSearch;
