import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([])

  useEffect(()=>{
    if (localStorage.getItem('candidates')) 
      {setCandidates(JSON.parse(localStorage.getItem('candidates')!))}
    else
    setCandidates([])
  },[])


  function handleDiscard(index: number) {
    const newCandidates = candidates
    newCandidates.splice(index, 1)
    localStorage.setItem('candidates', JSON.stringify(newCandidates))
    setCandidates(JSON.parse(localStorage.getItem('candidates')!))
  }


  return (
    <>
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead><tr>
            <th>Image</th>
            <th><p>Name</p><p>(Username)</p></th>
            <th>Github</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
        {candidates.map((candidate: Candidate, index) =>(
          <tr key={index}>
            <td className="tb-img-container"><img className="tb-img" src={candidate.avatar_url}/></td>
            <td><p>{candidate.name}</p><p>({candidate.login})</p></td>
            <td><a href={`${candidate.html_url}`}>{candidate.html_url}</a></td>
            <td>{candidate.location}</td>
            <td>{candidate.email}</td>
            <td>{candidate.company}</td>
            <td>{candidate.bio}</td>
            <td className="tb-btn-container"><button className="reject-btn tb-btn" onClick={()=>{handleDiscard(index)}}>-</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
