let user = null;

export const setUser = (userData) => {
  user = userData;
  console.log(user)
};

export const getUser = () => {
  return user;
};