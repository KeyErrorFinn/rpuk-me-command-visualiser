import React, { useState, useRef, useEffect } from "react";

const TestCompo = () => {
    const [text, setText] = useState("");
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef(null);
    const renderDivRef = useRef(null);

    const handleInput = (e) => {
        const newText = e.target.value;
        setText(newText);
        setCursorPosition(e.target.selectionStart); // Update cursor position
    };

    const handleClick = () => {
        // Sync cursor position when the user clicks
        setCursorPosition(textareaRef.current.selectionStart);
    };

    const handleKeyDown = (e) => {
        // Sync cursor position when the user presses arrow keys
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
            setTimeout(() => {
                setCursorPosition(textareaRef.current.selectionStart);
            }, 0);
        }
    };

    // Function to format the text with colors
    const formatText = (text) => {
        let parts = text.split(/(~r~|~s~)/g); // Split by ~r~ or ~s~
        let inRed = false; // Track whether we're inside a red section

        return parts.map((part, index) => {
            if (part === "~r~") {
                inRed = true; // Start red section
                return <span key={index} className="red-text">~r~</span>;
            } else if (part === "~s~") {
                inRed = false; // End red section
                return <span key={index}>~s~</span>;
            } else {
                // Wrap the text in a red span if inside a red section
                return inRed ? (
                    <span key={index} className="red-text">{part}</span>
                ) : (
                    <span key={index}>{part}</span>
                );
            }
        });
    };

    // Effect to position the cursor
    useEffect(() => {
        if (renderDivRef.current && textareaRef.current) {
            // Create a temporary span to measure the cursor position
            const tempSpan = document.createElement("span");
            tempSpan.textContent = text.slice(0, cursorPosition);
            renderDivRef.current.appendChild(tempSpan);

            // Get the position of the temporary span
            const rect = tempSpan.getBoundingClientRect();
            const cursorLeft = rect.right;
            const cursorTop = rect.top;

            // Position the cursor
            const cursor = document.getElementById("cursor");
            if (cursor) {
                cursor.style.left = `${cursorLeft}px`;
                cursor.style.top = `${cursorTop}px`;
                cursor.style.display = "block"; // Ensure the cursor is visible
            }

            // Remove the temporary span
            renderDivRef.current.removeChild(tempSpan);
        }
    }, [text, cursorPosition]);

    return (
        <>
            <div className="customizer-content-sub-heading">Test Component</div>
            <div style={{ position: "relative", width: "100%", height: "100px" }}>
                {/* Text Layer (hidden textarea) */}
                <textarea
                    ref={textareaRef}
                    value={text}
                    onInput={handleInput}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0, // Hide the textarea
                        zIndex: 1, // Ensure it's on top
                        resize: "none", // Disable resizing
                        overflow: "hidden", // Hide scrollbars
                    }}
                />
                {/* Rendering Layer (formatted text) */}
                <div
                    ref={renderDivRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "1px solid #000",
                        padding: "10px",
                        whiteSpace: "pre-wrap", // Preserve whitespace and line breaks
                        pointerEvents: "none", // Make it non-interactive
                        zIndex: 0, // Ensure it's behind the textarea
                        fontFamily: "monospace", // Use monospace font for consistent cursor positioning
                    }}
                >
                    {formatText(text)}
                    {/* Simulated Cursor */}
                    <div
                        id="cursor"
                        style={{
                            position: "absolute",
                            width: "2px",
                            height: "1em",
                            backgroundColor: "black",
                            animation: "blink 1s steps(2, start) infinite",
                            display: "none", // Initially hidden
                        }}
                    />
                </div>
            </div>
            {/* CSS for blinking cursor */}
            <style>
                {`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                `}
            </style>
        </>
    );
};

export default TestCompo;