export const fetchUserData = async () => {
    try {
        const response = await fetch("https://interviewersbackend.herokuapp.com/api/v1/users")
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e);
        
    }
}

export const fetchFilesData = async () => {
    try {
        const response = await fetch("http://appexperiment.herokuapp.com/api/v1/files")
        const data = await response.json()
        return data
    } catch (e) {
        console.log(e); 
        
    }
}