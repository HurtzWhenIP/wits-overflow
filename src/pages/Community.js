import '../styles/Community.css';

function Community() {

    return (
        <>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <div className='communityBox'>
                <div class="searchbar">
                    <input type="text" class="searchbar__input" name="q" placeholder="Search Videos"/>
                        <button type="submit" class="searchbar__button">
                            <i class="material-icons">search</i>
                        </button>
                </div>

                
            </div>
        </>
    );
}

export default Community;