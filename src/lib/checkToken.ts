export const getResponse = async (accessToken: String): Promise<{result:boolean,data: any}> => {
    console.log("checkToken getResponse Function")
    console.log('Access Token:', accessToken);
    try {
        const response = await fetch('http://localhost:5000/api/v1/verifytoken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const info = await response.json();

        if (response.status === 200) {
            return {result:true,data:info};
        } else if (response.status === 401 || response.status === 403) {
            return {result:false,data:{details:"Not Verified"}};
        }
    } catch (error) {
        console.error('Error:', error);
        return {result:false,data: { error: 'An error occurred', details: error }};
    }
    return { result: false, data: { error: 'Unexpected error' } };
};