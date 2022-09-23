import axios from 'axios';

const endpoints = {
	login: `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/login`,
	profile: `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/profile`
};

export const loginEndpoint = async (email, password) => {
	const { data } = await axios.post(endpoints.login, { email, password });
	return data.token;
};

export const profileEndpoint = async token => {
	console.log('profileEndpoint', token);
	const { data } = await axios.get(endpoints.profile, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	console.log({ data });

	return data;
};
