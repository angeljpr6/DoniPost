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

export const getFollowing = async (userName) => {

  try {
      const response = await fetch(`http://localhost:3900/api/${userName}/following`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (response.status === 200) {
          const num = result.following.length
          console.log(num)
          setUserFollowing(num)

      } else {
      }
  } catch (error) {
      console.error('Error during login:', error);
  }
};

export const setUserFollowing = (userData) => {
  localStorage.setItem('following', JSON.stringify(userData));
};

export const getUserFollowing = () => {
  const following = localStorage.getItem('following');
  return following ? JSON.parse(following) : null;
};

export const getFollowerNum = async (userName) => {

  try {
      const response = await fetch(`http://localhost:3900/api/${userName}/followers`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (response.status === 200) {
          const num = result.followers.length
          console.log(result)
          setUserFollower(num)

      } else {
      }
  } catch (error) {
      console.error('Error during login:', error);
  }
};

export const setUserFollower = (userData) => {
  localStorage.setItem('Follower', JSON.stringify(userData));
};

export const getUserFollower = () => {
  const Follower = localStorage.getItem('Follower');
  return Follower ? JSON.parse(Follower) : null;
};