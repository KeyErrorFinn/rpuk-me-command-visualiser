const FormattingOptions = ({ changeColorOfSelection }) => {
    return (
        <>
        <div className='customizer-content-sub-heading'>These options are for formatting and for the GTA V wanted star</div>
        <div className="formatting-options-container">
            <div
                className="formatting-option"
                onClick={() => changeColorOfSelection("formatting", "", "Bold")}
            >Bold</div>
            <div
                className="formatting-option"
                onClick={() => changeColorOfSelection("formatting", "", "Italic")}
            >Italic</div>
            <div
                className="formatting-option"
                onClick={() => changeColorOfSelection("formatting", "", "New Line")}
            >New Line</div>
            <div
                className="formatting-option"
                onClick={() => changeColorOfSelection("formatting", "", "Reset")}
            >Reset</div>
            <div
                className="formatting-option hidden"
                onClick={() => changeColorOfSelection("formatting", "", "Wanted Star")}
            >Star</div>
        </div>
        </>
    );
}

export default FormattingOptions;