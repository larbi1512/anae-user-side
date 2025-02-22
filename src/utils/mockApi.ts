export const searchActivities = async (query: string): Promise<string[]> => {


    try {
        console.log('Sending request for query:', query);
        
        const response = await fetch('http://172.20.10.2:5000/noai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Query: query })
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching activities:', error);
        return [];
    } finally {
        console.log('Request completed, ready for next request');
    }
};
