import Luis from './Photos/Luis.jpg';
import Rachelle from './Photos/Rachelle.jpg';
import Jason from './Photos/Jason.jpg';
import Daniel from './Photos/Daniel.jpg';
import Paloma from './Photos/Paloma.jpg';
import './Footer.css';

const Footer = () => {
    return (
        <>

    <div className='footer-container'>
        <footer>

            <p className='footer-title'> Developed by: </p>
            
            <div className="team-pics">

                <div className="team-member">
                    <a href='https://www.linkedin.com/in/luisj/'>
                        <img src={Luis} alt="teammember Luis" className='team-member-image' />
                    </a>
                    <p>Luis</p>
                </div>

                <div className="team-member">
                    <a href="https://www.linkedin.com/in/rachelleburgos/">
                        <img src={Rachelle} alt="teammember Rachelle" className='team-member-image' />
                    </a>
                    <p>Rachelle</p>
                </div>

                <div className='team-member'>
                    <a href="https://www.linkedin.com/in/paloma-almonte/">
                        <img src={Paloma} alt="teammember Paloma" className='team-member-image'/>
                    </a>
                    <p>Paloma</p>
                </div>

                <div className="team-member">
                    <a href="https://www.linkedin.com/in/jason-morales-d/">
                        <img src={Jason} alt="teammember Jason" className='team-member-image'/>
                    </a>
                    <p>Jason</p>
                </div>                

                <div className='team-member' >
                    <a href="https://www.linkedin.com/in/daniel-alfaro-a0205b21b/">
                        <img src={Daniel} alt="teammember Daniel" className='team-member-image'/>
                    </a>
                    <p>Daniel</p>
                </div>
            </div>
        
        <div>
            <p className='footer-copyright'> © 2024 El Quipe </p>
        </div>

        </footer>
    </div>
        </>
    )
}

export default Footer;