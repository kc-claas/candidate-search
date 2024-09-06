import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <Link to='/' className='nav-link'>Home</Link>
        </li>
        <li className="nav-item">
          <Link to='/SavedCandidates' className='nav-link'>Potential Candidates</Link>
        </li>
      </ul>
    </div>
  )
};

export default Nav;
