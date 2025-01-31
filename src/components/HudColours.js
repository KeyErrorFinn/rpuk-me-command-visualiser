import { useState, useEffect } from 'react';
import rawColoursData from '../assets/data/hud_colours.json';


function hexToRGB(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function hexToHSL(hex) {
    const [r, g, b] = hexToRGB(hex);

    // Normalize RGB values
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    let h = 0, s = 0, l = (max + min) / 2;

    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

        switch (max) {
            case rNorm: h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) % 6; break;
            case gNorm: h = (bNorm - rNorm) / delta + 2; break;
            case bNorm: h = (rNorm - gNorm) / delta + 4; break;
        }

        h = h * 60; // Convert to degrees
    }

    return [h, s, l];
}

function sortColours(colours, sortType="default") {
    const colourEntries = Object.entries(colours);

    switch (sortType) {
        case "hue-brightness":
            return colourEntries.sort(([, hexA], [, hexB]) => {
                const [hA, , lA] = hexToHSL(hexA);
                const [hB, , lB] = hexToHSL(hexB);
                return hA - hB || lA - lB;
            });

        case "hue-saturation-lightness":
            return colourEntries.sort(([, hexA], [, hexB]) => {
                const [hA, sA, lA] = hexToHSL(hexA);
                const [hB, sB, lB] = hexToHSL(hexB);
                return hA - hB || sB - sA || lA - lB;
            });

        case "brightness":
            return colourEntries.sort(([, hexA], [, hexB]) => {
                const [, , lA] = hexToHSL(hexA);
                const [, , lB] = hexToHSL(hexB);
                return lA - lB;
            }).reverse();

        case "saturation":
            return colourEntries.sort(([, hexA], [, hexB]) => {
                const [, sA] = hexToHSL(hexA);
                const [, sB] = hexToHSL(hexB);
                return sA - sB;
            }).reverse();

        case "custom-groups":
            return colourEntries.sort(([, hexA], [, hexB]) => {
                const [hA] = hexToHSL(hexA);
                const [hB] = hexToHSL(hexB);

                const getGroup = (hue) => {
                    if (hue < 30 || hue >= 330) return 1; // Reds
                    if (hue >= 30 && hue < 90) return 2; // Yellows
                    if (hue >= 90 && hue < 150) return 3; // Greens
                    if (hue >= 150 && hue < 210) return 4; // Cyans
                    if (hue >= 210 && hue < 270) return 5; // Blues
                    if (hue >= 270 && hue < 330) return 6; // Purples
                    return 7; // Fallback
                };

                const groupA = getGroup(hA);
                const groupB = getGroup(hB);
                return groupA - groupB || hA - hB;
            });

        case "rgb":
            return colourEntries.sort(([, hexA], [, hexB]) => {
                const [rA, gA, bA] = hexToRGB(hexA);
                const [rB, gB, bB] = hexToRGB(hexB);
                return rA - rB || gA - gB || bA - bB;
            }).reverse();

        case "default":
            return colourEntries;
    }
}


const HudColours = ({ changeColorOfSelection }) => {
    const [ hudColoursSortBy, setHudColoursSortBy ] = useState("custom-groups");
    const [ hudColoursSorted, setHudColoursSorted ] = useState([]);


    useEffect(() => {

        const sortedColours = sortColours(rawColoursData, hudColoursSortBy)
        setHudColoursSorted(sortedColours) 

    }, [hudColoursSortBy]);


    // Dropdown change handler
    const handleDropdownChange = (e) => {
        setHudColoursSortBy(e.target.value);
    };


    return (
        <>
        <div className='customizer-content-sub-heading'>These are HUD Colour values and work from "~HC_(number)~"</div>
        <select
            className='hidden'
            value={hudColoursSortBy}
            onChange={handleDropdownChange}
        >
            <option value="default">Default</option>
            <option value="custom-groups">Custom Grouping</option>
            <option value="hue-brightness">Hue & Brightness</option>
            <option value="hue-saturation-lightness">Hue, Saturation, & Lightness</option>
            <option value="brightness">Brightness</option>
            <option value="saturation">Saturation</option>
            <option value="rgb">RGB</option>
        </select>
        <div className="hud-colours-container">
        {hudColoursSorted.map(([number, hex]) => (
            <div
                key={number}
                className="hud-colour"
                style={{ backgroundColor: hex }}
                onClick={() => changeColorOfSelection("hud", hex, number)}
            >{number}</div>
        ))}
        </div>
        </>
    );
}

export default HudColours;