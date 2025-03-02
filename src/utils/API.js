// import axios from "axios";

// const BASE_URL = "https://localhost:5000/api/";
// const USER_URL = BASE_URL + "users/";
// const NOTE_URL = BASE_URL + "notes/";

// export const loginApiCall = async (payload) => {
//     try {
//         let response = await axios.post(`${USER_URL}login`, payload);
//         return response;
//     } catch (error) {
//         console.error("Error in loginApiCall: ", error);
//         throw error;
//     }
// };

// export const signinApiCall = async (payload) => {
//     try {
//         let response = await axios.post(`${USER_URL}register`, payload);
//         return response;
//     } catch (error) {
//         console.error("Error in signinApiCall: ", error);
//         throw error;
//     }
// };

// export const getNotes = async () => {
//     try {
//         return await axios.get(`${NOTE_URL}notes`, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in getNotes: ", error);
//         throw error;
//     }
// };

// export const addNoteApi = async (payload) => {
//     try {
//         return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", payload, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in addNoteApi: ", error);
//         throw error;
//     }
// };

// export const archiveNoteApi = async (payload) => {
//     try {
//         return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes", payload, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in archiveNoteApi: ", error);
//         throw error;
//     }
// };

// export const trashNoteApi = async (payload) => {
//     try {
//         return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", payload, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in trashNoteApi: ", error);
//         throw error;
//     }
// };

// export const deleteNoteForeverApi = async (payload) => {
//     try {

//         return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes", payload, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in deleteNoteForeverApi: ", error);
//         throw error;
//     }
// };


// export const editNoteApi = async (payload) => {
//     try {

//         return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes", payload, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in editNoteApi: ", error);
//         throw error;
//     }
// };

// export const changeColorAPI = async (payload) => {
//     try {

//         return await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes", payload, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in editNoteApi: ", error);
//         throw error;
//     }
// };
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

// export const getNotes = async () => {
//     try {
//         return await axios.get(`${NOTE_URL}`, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in getNotes: ", error);
//         throw error;
//     }
// };
export const getNotes = async () => {
    try {
        const tokenObject = JSON.parse(localStorage.getItem('token')); // Parse the stored JSON string
        if (!tokenObject || !tokenObject.token) {
            throw new Error("No valid token found in localStorage");
        }
        const accessToken = tokenObject.token; // Extract the token string
        console.log("Sending token in Authorization header:", accessToken); // Debug

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

// export const addNoteApi = async (payload) => {
//     try {
//         return await axios.post(`${NOTE_URL}`, payload, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in addNoteApi: ", error);
//         throw error;
//     }
// };
export const addNoteApi = async (payload) => {
    try {
        const tokenObject = JSON.parse(localStorage.getItem('token')); // Parse the JSON string
        if (!tokenObject || !tokenObject.token) {
            throw new Error("No valid token found in localStorage");
        }
        const accessToken = tokenObject.token; // Extract the token string
        console.log("Sending token in Authorization header:", accessToken); // Debug

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

// export const archiveNoteApi = async (payload) => {
//     try {
        
//         return await axios.patch(`${NOTE_URL}${payload.id}/isArchive`, payload, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in archiveNoteApi: ", error);
//         throw error;
//     }
// };

export const archiveNoteApi = async (payload) => {
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

// export const trashNoteApi = async (payload) => {
//     try {
//         return await axios.patch(`${NOTE_URL}${payload.id}/isTrash`, payload, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//     } catch (error) {
//         console.error("Error in trashNoteApi: ", error);
//         throw error;
//     }
// };
export const trashNoteApi = async (payload) => {
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
        return await axios.delete(`${NOTE_URL}${payload.id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in deleteNoteForeverApi: ", error);
        throw error;
    }
};

export const editNoteApi = async (payload) => {
    try {
        return await axios.put(`${NOTE_URL}${payload.id}`, payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in editNoteApi: ", error);
        throw error;
    }
};

// Note: Your backend doesn’t have a direct color change route, so this is omitted or needs clarification
export const changeColorAPI = async (payload) => {
    try {
        return await axios.post(`${NOTE_URL}changesColorNotes`, payload, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
    } catch (error) {
        console.error("Error in changeColorAPI: ", error);
        throw error;
    }
};
