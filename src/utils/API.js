import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const NOTE_URL = BASE_URL + "notes/";
const USER_URL = BASE_URL + "users/";

export const loginApiCall = async (payload) => {
    try {
        let response = await axios.post(`${USER_URL}login`, payload);
        return response;
    } catch (error) {
        console.error("Error in loginApiCall: ", error);
        throw error;
    }
};

export const signinApiCall = async (payload) => {
    try {
        let response = await axios.post(`${USER_URL}register`, payload);
        return response;
    } catch (error) {
        console.error("Error in signinApiCall: ", error);
        throw error;
    }
};

export const getNotes = async () => {
    try {
        const tokenObject = JSON.parse(localStorage.getItem('token')); // Parse the stored JSON string
        if (!tokenObject || !tokenObject.token) {
            throw new Error("No valid token found in localStorage");
        }
        const accessToken = tokenObject.token; // Extract the token string
        // console.log("Sending token in Authorization header:", accessToken); // Debug

        return await axios.get(`${NOTE_URL}`, {
            headers: {
                Authorization: `Bearer ${accessToken}` // Send only the token with Bearer prefix
            }
        });
    } catch (error) {
        console.error("Error in getNotes: ", error);
        throw error;
    }
};

export const addNoteApi = async (payload) => {
    try {
        const tokenObject = JSON.parse(localStorage.getItem('token')); // Parse the JSON string
        if (!tokenObject || !tokenObject.token) {
            throw new Error("No valid token found in localStorage");
        }
        const accessToken = tokenObject.token; // Extract the token string
        // console.log("Sending token in Authorization header:", accessToken); // Debug

        return await axios.post(`${NOTE_URL}`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}` // Use Bearer + token string
            }
        });
    } catch (error) {
        console.error("Error in addNoteApi: ", error);
        throw error;
    }
};

export const archiveNoteApi = async (payload) => {
    try {
        const tokenObject = JSON.parse(localStorage.getItem('token'));
        if (!tokenObject || !tokenObject.token) {
            throw new Error("No valid token found in localStorage");
        }
        const accessToken = tokenObject.token;
        // console.log("Sending token in Authorization header:", accessToken);

        const noteId = payload.noteIdList && payload.noteIdList.length > 0 ? payload.noteIdList[0] : null;
        if (!noteId) {
            throw new Error("No note ID provided in payload");
        }

        // Use isArchive to match backend expectation
        return await axios.patch(`${NOTE_URL}${noteId}/isArchive`, { isArchive: payload.isArchived }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch (error) {
        console.error("Error in archiveNoteApi: ", error);
        if (error.response) {
            console.log("Full error details:", error.response.data); // Log backend error message
        }
        throw error;
    }
};

export const trashNoteApi = async (payload) => {
    try {
        const tokenObject = JSON.parse(localStorage.getItem('token'));
        if (!tokenObject || !tokenObject.token) {
            throw new Error("No valid token found in localStorage");
        }
        const accessToken = tokenObject.token;
        // console.log("Sending token in Authorization header:", accessToken);

        const noteId = payload.noteIdList && payload.noteIdList.length > 0 ? payload.noteIdList[0] : null;
        if (!noteId) {
            throw new Error("No note ID provided in payload");
        }

        // Send only isTrash field to match backend expectation
        return await axios.patch(`${NOTE_URL}${noteId}/isTrash`, { isTrash: payload.isDeleted }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch (error) {
        console.error("Error in trashNoteApi: ", error);
        if (error.response) {
            console.log("Full error details:", error.response.data);
        }
        throw error;
    }
};
export const deleteNoteForeverApi = async (payload) => {
    try {
        const tokenObject = JSON.parse(localStorage.getItem('token'));
        if (!tokenObject || !tokenObject.token) {
            throw new Error("No valid token found in localStorage");
        }
        const accessToken = tokenObject.token;
        // console.log("Sending token in Authorization header:", accessToken);

        const noteId = payload.noteIdList && payload.noteIdList.length > 0 ? payload.noteIdList[0] : null;
        if (!noteId) {
            throw new Error("No note ID provided in payload");
        }

        // Extract userId from the token (assuming token contains userId)
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1])); // Decode JWT payload
        const userId = decodedToken.id || decodedToken.userId; // Adjust based on your token structure
        if (!userId) {
            throw new Error("No user ID found in token");
        }

        // Use DELETE request with userId in the body
        return await axios.delete(`${NOTE_URL}${noteId}`, {
            data: { userId },
            headers: {
                Authorization: `Bearer ${accessToken}` // Use Bearer token format
            }
        });
    } catch (error) {
        console.error("Error in deleteNoteForeverApi: ", error);
        if (error.response) {
            console.log("Full error details:", error.response.data);
        }
        throw error;
    }
};
export const editNoteApi = async (payload) => {
    try {
        const tokenObject = JSON.parse(localStorage.getItem('token'));
        if (!tokenObject || !tokenObject.token) {
            throw new Error("No valid token found in localStorage");
        }
        const accessToken = tokenObject.token;
        console.log("Sending token in Authorization header:", accessToken);
        console.log("Edit note payload:", payload);

        const noteId = payload.noteId;
        if (!noteId || typeof noteId !== 'string' || noteId.trim() === '') {
            throw new Error("No valid note ID provided in payload");
        }

        return await axios.put(`${NOTE_URL}${noteId}`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch (error) {
        console.error("Error in editNoteApi: ", error);
        if (error.response) {
            console.log("Full error details:", error.response.data);
        }
        throw error;
    }
};

export const changeColorAPI = async (payload) => {
    try {
        const tokenObject = JSON.parse(localStorage.getItem('token'));
        if (!tokenObject || !tokenObject.token) {
            throw new Error("No valid token found in localStorage");
        }
        const accessToken = tokenObject.token;
        console.log("Sending token in Authorization header:", accessToken);

        const noteId = payload.noteIdList && payload.noteIdList.length > 0 ? payload.noteIdList[0] : null;
        if (!noteId) {
            throw new Error("No note ID provided in payload");
        }

        return await axios.put(`${NOTE_URL}${noteId}`, { color: payload.color }, {
            headers: {
                Authorization: `Bearer ${accessToken}` 
            }
        });
    } catch (error) {
        console.error("Error in changeColorAPI: ", error);
        if (error.response) {
            console.log("Full error details:", error.response.data); 
        }
        throw error;
    }
};
