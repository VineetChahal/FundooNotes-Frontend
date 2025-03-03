import React from 'react';
import './TrashContainer.scss';
import { useNotes } from '../../context/NotesContext';
import MasonryGrid from '../MasonryGrid/MasonryGrid'; // Import only MasonryGrid

const TrashContainer = () => {
    const { notes, updateNoteList } = useNotes();
    const trashedNotes = notes.filter((note) => note.isTrash).reverse();

    return (
        <div className='notes-main-container'>
            <div className="notes-inner-container">
                <MasonryGrid notes={trashedNotes} updateList={updateNoteList} />
            </div>
        </div>
    );
};

export default TrashContainer;