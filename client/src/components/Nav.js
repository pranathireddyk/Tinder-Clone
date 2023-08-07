import colorLogo from '../images/tinder-color.png';
import bwLogo from '../images/tinder-b:w.png';

const Nav = ({authToken, minimal, setShowModel, showModel, setIsSignUp}) => {
    const handleClick = () => {
        setShowModel(true);
        setIsSignUp(false);
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? colorLogo : bwLogo}/>
            </div>

            {!authToken && !minimal && <button 
            className='nav-button'
            onClick={handleClick}
            disabled={showModel}>Log in</button>}
        </nav>
    )
}

export default Nav;