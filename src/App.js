import React, { useState } from 'react';
import useWebSocket from './utils/WebSocketService';
import RealTimeChart from './components/RealTimeChart';

const App = () => {
    const { data, error, isConnected, loading } = useWebSocket('ws://localhost:8080');
    const [dataPoints, setDataPoints] = useState([]);
    const [paused, setPaused] = useState(false);
    const [dataView, setDataView] = useState('time'); 

    React.useEffect(() => {
        if (data && !paused) {
            if (dataView === 'time') {
                setDataPoints((prevData) => [...prevData, data.time]);
            } else if (dataView === 'random') {
                setDataPoints((prevData) => [...prevData, Math.random() * 100]); 
            }
        }
    }, [data, paused, dataView]);

    const handlePauseResume = () => {
        setPaused((prev) => !prev);
    };

    const handleDataViewChange = (event) => {
        setDataView(event.target.value);
        setDataPoints([]);
    };

    return (
        <div>
            <h1>Real-Time Data Visualization</h1>
            {loading && <p>Loading data...</p>}
            {isConnected ? <p>Connected to WebSocket server</p> : <p>Connecting...</p>}
            {error && <p>Error: {error.message}</p>}
            <button onClick={handlePauseResume}>
                {paused ? 'Resume Updates' : 'Pause Updates'}
            </button>
            <select value={dataView} onChange={handleDataViewChange}>
                <option value="time">Time</option>
                <option value="random">Random Number</option>
            </select>
            <div>
                <h2>Data:</h2>
                {data ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                ) : (
                    <p>No data yet.</p>
                )}
            </div>
            <RealTimeChart data={dataPoints} />
        </div>
    );
};

export default App;