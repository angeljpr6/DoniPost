
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
    localStorage.setItem('UserFollowing', JSON.stringify(userData));
};

export const getUserFollowing = () => {
    const UserFollowing = localStorage.getItem('UserFollowing');
    return UserFollowing ? JSON.parse(UserFollowing) : null;
};