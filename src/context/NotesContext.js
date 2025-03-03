import { createContext, useContext, useEffect, useState } from "react";
import { getNotes } from "../utils/API";
import { useLocation } from 'react-router-dom'; // Add this for endpoint detection

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [searchedText, setSearchedText] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state for refreshes
    const [error, setError] = useState(null);
    const location = useLocation(); // Detect route changes

    const fetchNotes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getNotes();
            console.log("NotesContext fetchNotes response:", response.data);
            setNotes(response?.data?.notes || []); // Store all notes, no filtering here
        } catch (error) {
            setError(error.message || "Failed to fetch notes");
            console.error("Error Fetching Notes: ", error);
        } finally {
            setLoading(false);
        }
    };

    const refreshNotes = () => {
        fetchNotes(); // Re-fetch notes on manual refresh or endpoint hit
    };

    // Fetch notes on mount, not on route change
    useEffect(() => {
        fetchNotes();
    }, []); // Add dependencies if needed (e.g., userId, token)

    // Filter notes based on the current endpoint (route) and search
    const getFilteredNotes = () => {
        const baseFilter = (note) => {
            if (!searchedText.trim()) return true; // No search, show all notes for endpoint
            const searchText = searchedText.toLowerCase();
            return (
                (note?.title?.toLowerCase() || "").includes(searchText) ||
                (note?.description?.toLowerCase() || "").includes(searchText)
            );
        };

        if (location.pathname.includes('/archive')) {
            return notes.filter((note) => note.isArchive && baseFilter(note)).reverse();
        } else if (location.pathname.includes('/trash')) {
            return notes.filter((note) => note.isTrash && baseFilter(note)).reverse();
        } else if (location.pathname.includes('/notes')) {
            return notes.filter((note) => !note.isArchive && !note.isTrash && baseFilter(note));
        }
        return notes.filter(baseFilter); // Default to all notes if no match
    };

    const updateNoteList = (response) => {
        const { action, data } = response;
        if (action === "add") {
            setNotes((prevNotes) => [{ ...data, _id: data._id }, ...prevNotes]);
        } else if (action === "archive" || action === "trash") {
            setNotes((prevNotes) => prevNotes.map(note => note._id === data._id ? { ...note, [action === "archive" ? "isArchive" : "isTrash"]: !note[action === "archive" ? "isArchive" : "isTrash"] } : note));
        } else if (action === "edit") {
            setNotes((prevNotes) =>
                prevNotes.map((note) => (note._id === data._id ? data : note))
            );
        }
    };

    return (
        <NotesContext.Provider value={{ notes, setNotes, updateNoteList, searchedText, setSearchedText, filteredNotes: getFilteredNotes(), loading, error, refreshNotes }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext);