import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            setIsConnected(true);
            setLoading(false); 
        };

        socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            setData(parsedData);
        };

        socket.onerror = (event) => {
            setError(event);
            setLoading(false);
        };

        socket.onclose = () => {
            setIsConnected(false);
        };

        return () => {
            socket.close();
        };
    }, [url]);

    return { data, error, isConnected, loading }; 
};

export default useWebSocket;