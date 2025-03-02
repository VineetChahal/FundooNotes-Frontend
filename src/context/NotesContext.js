// import { createContext, useContext, useEffect, useState } from "react";
// import { getNotes } from "../utils/API";

// const NotesContext = createContext();

// export const NotesProvider = ({ children }) => {
//     const [notes, setNotes] = useState([]);
//     const [searchedText, setSearchedText] = useState("");

//     useEffect(() => {
//         fetchNotes();
//     }, []);

//     const fetchNotes = async () => {
//         try {
//             const response = await getNotes();
//             if (response.status !== 200) {
//                 throw new Error(response?.data?.message || "Failed to fetch notes");
//             }
//             console.log("Notes response:", response.data);
//             const fetchedNotes = (response?.data?.notes || []).filter(
//                 (note) => !note.isArchived && !note.isTrash // Use isTrash as per backend
//             );
//             setNotes(fetchedNotes.reverse());
//         } catch (error) {
//             console.error("Error Fetching Notes: ", error);
//         }
//     };

//     const filteredNotes = notes.filter((note) => {
//         if (!searchedText.trim()) return true;
//         const searchText = searchedText.toLowerCase();
//         return (
//             (note?.title?.toLowerCase() || "").includes(searchText) ||
//             (note?.description?.toLowerCase() || "").includes(searchText)
//         );
//     });

//     const updateNoteList = (response) => {
//         const { action, data } = response;
//         if (action === "add") {
//             setNotes((prevNotes) => [{ ...data, _id: data._id }, ...prevNotes]);
//         } else if (action === "archive" || action === "trash") {
//             setNotes((prevNotes) => prevNotes.filter((note) => note._id !== data._id));
//         } else if (action === "edit") {
//             setNotes((prevNotes) =>
//                 prevNotes.map((note) => (note._id === data._id ? data : note))
//             );
//         }
//         console.log("Updated notes:", notes); // Debug after update
//     };

//     return (
//         <NotesContext.Provider value={{ notes, setNotes, updateNoteList, searchedText, setSearchedText, filteredNotes }}>
//             {children}
//         </NotesContext.Provider>
//     );
// };

// export const useNotes = () => useContext(NotesContext);

import { createContext, useContext, useEffect, useState } from "react";
import { getNotes } from "../utils/API";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [searchedText, setSearchedText] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await getNotes();
            console.log("NotesContext fetchNotes response:", response.data);
            setNotes(response?.data?.notes || []); // Store all notes, no filtering here
        } catch (error) {
            console.error("Error Fetching Notes: ", error);
        }
    };

    const filteredNotes = notes.filter((note) => {
        if (!searchedText.trim()) return !note.isArchive && !note.isTrash; // Default view
        const searchText = searchedText.toLowerCase();
        return (
            (!note.isArchive && !note.isTrash) &&
            ((note?.title?.toLowerCase() || "").includes(searchText) ||
             (note?.description?.toLowerCase() || "").includes(searchText))
        );
    });

    const updateNoteList = (response) => {
        const { action, data } = response;
        if (action === "add") {
            setNotes((prevNotes) => [{ ...data, _id: data._id }, ...prevNotes]);
        } else if (action === "archive" || action === "trash") {
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== data._id));
        } else if (action === "edit") {
            setNotes((prevNotes) =>
                prevNotes.map((note) => (note._id === data._id ? data : note))
            );
        }
    };

    return (
        <NotesContext.Provider value={{ notes, setNotes, updateNoteList, searchedText, setSearchedText, filteredNotes }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext);