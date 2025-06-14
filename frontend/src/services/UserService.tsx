let USERS_API_URL;
const isProduction = import.meta.env.MODE === 'production';

if (isProduction) {
    USERS_API_URL = 'https://qwdashboard.di.fc.ul.pt/api/users';
}
else {
    USERS_API_URL = 'http://localhost:8082/api/users';
}

export const registerUser = async(
    auth0_id: string | undefined,
    nickname: string | undefined,
    picture: string | undefined,
    email: string | undefined
) => {
    const response = await fetch(`${USERS_API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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

    throw new Error('It was not possible to retrieve the user.');
}

export const getUser = async(
    auth0_id: string | undefined
) => {
    if (auth0_id === undefined)
        return;

    const response = await fetch(`${USERS_API_URL}/${auth0_id}`);

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
}