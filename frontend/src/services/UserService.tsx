import { useAuth0 } from '@auth0/auth0-react';

let USERS_API_URL;
const isProduction = import.meta.env.VITE_MODE === 'production';

if (isProduction) {
    USERS_API_URL = 'https://qwdashboard.di.fc.ul.pt/api/users';
}
else {
    USERS_API_URL = 'http://localhost:8082/api/users';
}

export const useAuthenticatedFetch = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    return async (url: string, options: RequestInit = {}): Promise<Response> => {
        const token = await getAccessTokenSilently();
        
        const authHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers: authHeaders,
        });

        if (response.status === 401 || response.status === 403) {
            throw new Error('Authentication failed');
        }

        return response;
    };
};

export const useUserApi = () => {
    const authenticatedFetch = useAuthenticatedFetch();
    
    const registerUser = async (
        auth0_id: string | undefined,
        nickname: string | undefined,
        picture: string | undefined,
        email: string | undefined
    ) => {
        const response = await authenticatedFetch(`${USERS_API_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({
                auth0_id,
                nickname,
                picture,
                email
            })
        });
        
        const data = await response.json();
        
        if (response.status === 200 && data['user_id']) {
            return {
                user_id: data['user_id']
            };
        }
        
        throw new Error('It was not possible to register the user.');
    };

    const getUser = async (auth0_id: string | undefined) => {
        if (auth0_id === undefined) {
            return;
        }
        
        const response = await authenticatedFetch(`${USERS_API_URL}/${auth0_id}`);
        const data = await response.json();
        
        if (response.status === 404) {
            return {
                "exists": data['exists']
            };
        }
        
        if (response.status === 200) {
            return {
                "exists": data['exists'],
                "user_id": data['user_id'],
                "nickname": data['nickname'],
                "picture": data['picture'],
                "email": data['email']
            };
        }
        
        throw new Error('It was not possible to retrieve the user.');
    };

    return {
        registerUser,
        getUser
    };
};