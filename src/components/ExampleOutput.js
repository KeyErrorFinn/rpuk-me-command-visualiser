import exampleBackground from "../assets/images/example_background.png";

const ExampleOutput = ({ exampleHTML }) => {
    return (
        <div className='box-container'>
            <div className='box-header'>Output Example</div>
            <div className='example-container'>
                {/* <div className='mid-line'></div> */}
                <img
                    className='example-background'
                    src={exampleBackground}
                    alt=''
                />
                <div className='example-text-box-container'>
                    <div
                        id='example-text-box'
                        dangerouslySetInnerHTML={{ __html: exampleHTML }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default ExampleOutput;