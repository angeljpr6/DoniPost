export const setIdComent = (id) => {
    localStorage.setItem('idComent', JSON.stringify(id));
};

export const getIdComent = () => {
    const id = localStorage.getItem('idComent');
    return id ? JSON.parse(id) : null;
};