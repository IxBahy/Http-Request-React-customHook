import { useCallback, useState } from 'react'

const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (configrations, preprocessorFunction) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                configrations.url, {
                method: configrations.method ? configrations.method : 'GET',
                headers: configrations.headers ? configrations.headers : {},
                body: configrations.body ? JSON.stringify(configrations.body) : null,
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            preprocessorFunction(data)

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [])


    return {
        error,
        isLoading,
        sendRequest
    }
}

export default useHttp 