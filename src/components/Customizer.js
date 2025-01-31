import CustomizerInput from './CustomizerInput';
import FormattingOptions from './FormattingOptions';
import FivemColours from './FivemColours';
import HudColours from './HudColours';
import TestCompo from './TestCompo';

const Customizer = ({ setExampleHTML }) => {
    const changeColorOfSelection = (type="custom", colour, identifier="") => {
        const textArea = document.getElementById("customizer-text-area");
        const textAreaText = textArea.value;

        const selectionStart = textArea.selectionStart;
        const selectionEnd = textArea.selectionEnd;


        const beforeSelection = textAreaText.substring(0, selectionStart);
        const selectedText = textAreaText.substring(selectionStart, selectionEnd);
        const afterSelection = textAreaText.substring(selectionEnd);

        const formatChoices = {
            "hud": [`~HC_${identifier}~`, "~s~"],
            "embedded": [`~${identifier}~`, "~s~"],
            "formatting": {
                "Bold": ["~h~", "~h~"],
                "Italic": ["<i>", "</i>"],
                "New Line": ["~n~", ""],
                "Reset": ["~s~", ""],
                "Wanted Star": ["~ws~", ""]
            },
            "custom": [`<font color="${colour}">`, "</font>"]
        }


        let colourStart;
        let colourEnd;
        const formatChoice = formatChoices[type];
        if (type === "formatting") {
            const specificFormatting = formatChoice[identifier];
            colourStart = specificFormatting[0];
            colourEnd = specificFormatting[1];
        } else {
            colourStart = formatChoice[0];
            colourEnd = formatChoice[1];
        }


        let textForInput = `${colourStart}${selectedText}`;

        // Checks if something is selected
        if (selectionStart !== selectionEnd && selectionStart !== textAreaText.length) {
            textForInput += colourEnd;
        }
        
        const updatedTextInput = `${beforeSelection}${textForInput}${afterSelection}`;
        textArea.value = updatedTextInput;

        // Create an input event and dispatch it
        const event = new Event("input", { bubbles: true });
        textArea.dispatchEvent(event);
        
        // textArea
        textArea.focus();
    }


    return (
        <div className='box-container'>
            <div className='box-header'>Customizer</div>
            <div className='customizer-content-container'>
                <CustomizerInput setExampleHTML={setExampleHTML} />
                <div className='customizer-content-heading'>To add formatting, select the text you want coloured or click a space, and then press the desired button</div>
                <FormattingOptions changeColorOfSelection={changeColorOfSelection} />
                <FivemColours changeColorOfSelection={changeColorOfSelection} />
                <HudColours changeColorOfSelection={changeColorOfSelection} />
                <TestCompo />
            </div>
        </div>
    );
}

export default Customizer;