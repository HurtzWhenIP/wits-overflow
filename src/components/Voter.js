import '../styles/Voter.css'

function Voter({post}){

    return(
        <div className="voterBox">
            <div className='voteupButton voteButton'></div>
            <div className='votedownButton voteButton'></div>
        </div>
    )

}

export default Voter;