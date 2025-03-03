import React from "react";
import "./NotesContainer.scss";
import AddNote from "../AddNote/AddNote";
import { useNotes } from "../../context/NotesContext";
import MasonryGrid from "../MasonryGrid/MasonryGrid"; // Import only MasonryGrid

const NotesContainer = () => {
    const { filteredNotes, updateNoteList } = useNotes();

    return (
        <div className="notes-container">
            <div className="notes-addnote-component">
                <AddNote updateList={updateNoteList} />
            </div>
            <div className="notes-main-container">
                <div className="notes-inner-container">
                    <MasonryGrid notes={filteredNotes} updateList={updateNoteList} />
                </div>
            </div>
        </div>
    );
};

export default NotesContainer;