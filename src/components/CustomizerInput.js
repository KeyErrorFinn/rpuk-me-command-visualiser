import rawColoursData from '../assets/data/hud_colours.json';
import embeddedColours from '../assets/data/embedded_colours.json';


const CustomizerInput = ({ setExampleHTML }) => {
    const updateTextAreaHeight = (textArea) => {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight + 7}px`;
    }


    const changeExampleOutput = (textArea) => {
        const exampleTextBox = document.getElementById("example-text-box");
        let inputText = textArea.value;
        inputText = inputText.replace(/\n+/, "");
        
        const splitInputText = inputText.split(/(<font color="[^"]+">|~[^~]+~|<\/font>|<i>|<\/i>)/g).filter(Boolean);
        
        const formattingReplacements = {
            "</font>": "</span>",
            "~s~": `</b></i></span><span class="formatting-reset">`,
            "~n~": "<br>"
        }

        let inputToExampleHTML = ""
        for (let splitSection of splitInputText) {
            splitSection = splitSection.replace(/\n+/, "");
            const fontColorRegex = /<font color="([^"]+)">/;
            const fivemStartRegex = /~[^~]+~/;
            if (splitSection in formattingReplacements) {
                inputToExampleHTML += formattingReplacements[splitSection];
            } else if (fontColorRegex.test(splitSection)) {
                const color = splitSection.match(fontColorRegex)[1];

                inputToExampleHTML += `<span style="color: ${color}">`;
            } else if (splitSection === "~h~") {
                const matches = inputToExampleHTML.match(/<\/?b>/g); // Matches <b> or </b>

                // Check if there are any matches
                if (matches) {
                    const lastMatch = matches[matches.length - 1];

                    if (lastMatch === "<b>") {
                        inputToExampleHTML += "</b>";
                    } else if (lastMatch === "</b>") {
                        inputToExampleHTML += "<b>";
                    }
                } else {
                    inputToExampleHTML += "<b>";
                }
            } else if (fivemStartRegex.test(splitSection)) {
                const hudColourRegex = /~HC_(\d+)~/;
                const hudColourMatch = splitSection.match(hudColourRegex);

                const embeddedColourRegex = /~([^}]+)~/;
                const embeddedColourMatch = splitSection.match(embeddedColourRegex);
                
                let colour = "";
                if (hudColourMatch) {
                    colour = rawColoursData[hudColourMatch[1]];
                } else if (embeddedColourMatch) {
                    colour = embeddedColours[embeddedColourMatch[1]];
                    colour = colour.replace("#ffffff", "#e8e8e8");
                }
                
                if (colour !== "") {
                    inputToExampleHTML += `<span style="color: ${colour}">`;
                }
            } else {
                inputToExampleHTML += splitSection;
            }
        }
        
        setExampleHTML("");
        exampleTextBox.style.width = "";
        exampleTextBox.textContent = inputText;
        exampleTextBox.style.width = exampleTextBox.scrollWidth + "px";
        
        setTimeout(() => {
            console.log(inputToExampleHTML);
            setExampleHTML(inputToExampleHTML);
        }, 1);
        if (/<br>.+/.test(inputToExampleHTML)) {
            exampleTextBox.style.paddingTop = "3px";
        } else {
            exampleTextBox.style.paddingTop = "";
        }
    }


    const handleCustomizerInput = (e) => {
        const textArea = e.target;
        
        updateTextAreaHeight(textArea);
        
        changeExampleOutput(textArea);
    }


    return (
        <>
        <div className='customizer-content-heading'>Input what you want here</div>
        <textarea
            className='custom-scroll-bar'
            id='customizer-text-area'
            onInput={handleCustomizerInput}
            rows="1"
            placeholder='Input text here to write on visualizer'
        ></textarea>
        </>
    );
}

export default CustomizerInput;