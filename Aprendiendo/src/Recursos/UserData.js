
export const getFollowingNumUserData = async (userName) => {

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
            setUserDataFollowing(num)

        } else {
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
};


export const getFollowergNumUserData = async (userName) => {

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
            setUserDataFollower(num)

        } else {
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
};

export const setUserDataFollower = (userData) => {
    localStorage.setItem('UserFollower', JSON.stringify(userData));
};

export const getUserDataFollower = () => {
    const UserFollower = localStorage.getItem('UserFollower');
    return UserFollower ? JSON.parse(UserFollower) : null;
};

export const setUserDataFollowing = (userData) => {
    localStorage.setItem('UserFollowing', JSON.stringify(userData));
};

export const getUserDataFollowing = () => {
    const UserFollowing = localStorage.getItem('UserFollowing');
    return UserFollowing ? JSON.parse(UserFollowing) : null;
};

export const setUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  };
  
  export const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };