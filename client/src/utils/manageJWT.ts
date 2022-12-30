export const getJWT = () => {
	return localStorage.getItem('foodini_jwt');
};

export const setJWT = (jwt: string) => {
	localStorage.setItem('foodini_jwt', jwt);
};

export const removeJWT = () => {
	localStorage.removeItem('foodini_jwt');
};
