import embeddedColours from '../assets/data/embedded_colours.json';

const FivemColours = ({ changeColorOfSelection }) => {
    return (
        <>
        <div className='customizer-content-sub-heading'>These are FiveM default work from "~(letter)~"</div>
        <div className="embedded-colours-container">
        {Object.entries(embeddedColours).map(([letter, hex]) => (
            <div
                key={letter}
                className="embedded-colour"
                style={{ backgroundColor: hex }}
                onClick={() => changeColorOfSelection("embedded", hex, letter)}
            >{letter.toUpperCase()}</div>
        ))}
        </div>
        </>
    );
}

export default FivemColours;