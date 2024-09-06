// TODO: Create an interface for the Candidate objects returned by the API

interface Candidate {
    name: string | null,
    login: string,
    location: string | null,
    avatar_url: string,
    email: string | null,
    htmlUrl: string,
    company: string | null,
    bio: string | null
}


export default Candidate