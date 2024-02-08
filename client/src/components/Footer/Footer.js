import placeholder from '../photos/placeholder.png';
import './footer.css';

const Footer = () => {
    return (
        <>
        <h2 className='title'> About Us</h2>

        <footer>
        
            <p> Developed by: </p>
            
            <div className="team_pics">

                <div className="team_member">
                    <img src={placeholder} alt="teammember Luis" />
                    <p>Luis</p>
                </div>

                <div className="team_member">
                    <img src={placeholder} alt="teammember Jason" />
                    <p>Jason</p>
                </div>

                <div className="team_member">
                    <img src={placeholder} alt="teammember Rachelle" />
                    <p>Rachelle</p>
                </div>

                <div className='team_member'>
                    <img src={placeholder} alt="teammember Paloma" />
                    <p>Paloma</p>
                </div>                

                <div className='team_member' >
                    <img src={placeholder} alt="teammember Daniel" />
                    <p>Daniel</p>
                </div>
            </div>
        
        <div className='trademark'>
            <p> © 2024 El Quipe </p>
        </div>
        </footer>
        </>
    )
}

export default Footer;