import { useState } from 'react';
import './styles/App.scss';
import Customizer from './components/Customizer';
import ExampleOutput from './components/ExampleOutput';


function App() {
    const [ exampleHTML, setExampleHTML ] = useState("");

    
    return (
        <div className='main-container'>
        
            <Customizer setExampleHTML={setExampleHTML} />
            
            <ExampleOutput exampleHTML={exampleHTML} />
        
        </div>
        
    );
}


export default App;