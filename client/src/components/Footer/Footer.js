import placeholder from './Photos/placeholder.png';
import './Footer.css';

const Footer = () => {
    return (
        <>

    <div className='footer-container'>
        <footer>
            <h3 className='title'> About Us</h3>
            <p> Developed by: </p>
            
            <div className="team_pics">

                <div className="team_member">
                    <img src={placeholder} alt="teammember Luis" />
                    <p>Luis</p>
                </div>

                <div className="team_member">
                    <img src={placeholder} alt="teammember Rachelle" />
                    <p>Rachelle</p>
                </div>

                <div className='team_member'>
                    <img src={placeholder} alt="teammember Paloma" />
                    <p>Paloma</p>
                </div>

                <div className="team_member">
                    <img src={placeholder} alt="teammember Jason" />
                    <p>Jason</p>
                </div>                

                <div className='team_member' >
                    <img src={placeholder} alt="teammember Daniel" />
                    <p>Daniel</p>
                </div>
            </div>
        
        <div>
            <p> © 2024 El Quipe </p>
        </div>

        </footer>
    </div>
        </>
    )
}

export default Footer;