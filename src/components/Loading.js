import '../styles/Loading.css';
//loading animation for use when needed to show whole-page loading
function Loading({ caption }) {
    return (
        <div className='prompt'>
            <div className='ring'>
                <div className="centered">
                    <div className="blob-1"></div>
                    <div className="blob-2"></div>
                </div>
                <br />
                <span className='caption'>{caption}</span>
            </div>
        </div>
    )
}

export default Loading;