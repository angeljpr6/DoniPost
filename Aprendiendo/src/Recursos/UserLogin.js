export const setUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setBiography = (userData) => {
  localStorage.setItem('bio', JSON.stringify(userData));
};
export const getBiography = () => {
  const bio = localStorage.getItem('bio');
  return bio ? JSON.parse(bio) : null;
};