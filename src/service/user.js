export const getUser = () =>
    fetch('https://fakestoreapi.com/users/1').then(res => res.json())


export const inviteUser = (emails) => {
    const apiEndpoint = 'http://localhost:9000/invite-users';
    fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emails),
    })
        .then((response) => response.json())
        .catch((error) => console.error(error));
};