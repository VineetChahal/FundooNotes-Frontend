import React from 'react';
import './ArchiveContainer.scss';
import { useNotes } from '../../context/NotesContext';
import MasonryGrid from '../MasonryGrid/MasonryGrid';

const ArchiveContainer = () => {
    const { notes, updateNoteList } = useNotes();
    const archivedNotes = notes.filter((note) => note.isArchive).reverse();

    return (
        <div className='notes-main-container'>
            <div className="notes-inner-container">
                <MasonryGrid notes={archivedNotes} updateList={updateNoteList} />
            </div>
        </div>
    );
};

export default ArchiveContainer;