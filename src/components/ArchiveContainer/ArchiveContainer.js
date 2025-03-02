// import React, { useEffect, useState } from 'react';
// import { getNotes } from '../../utils/API';
// import NoteCard from '../NoteCard/NoteCard';
// import './ArchiveContainer.scss';

// const ArchiveContainer = () => {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const response = await getNotes();
//         console.log("ArchiveContainer fetchNotes response:", response.data);
//         let archivedNotes = (response?.data?.notes || []).filter((note) => note.isArchive); // Use isArchive
//         setNotes(archivedNotes.reverse());

//         if (response.status !== 200) {
//           throw new Error(response?.data?.message || "Failed to fetch notes");
//         }
//       } catch (error) {
//         console.error("Error fetching notes:", error);
//       }
//     };

//     fetchNotes();
//   }, []);

//   const updateNoteList = (response) => {
//     const { action, data } = response;
//     if (action === 'archive' || action === 'trash') {
//       setNotes(notes.filter((note) => note._id !== data._id)); // Use _id
//     }
//   };

//   return (
//     <div className='notes-main-container'>
//       {notes.map((note, index) => (
//         <NoteCard
//           key={note._id || index} // Use _id
//           title={note.title}
//           description={note.description}
//           noteDetails={note}
//           updateList={updateNoteList}
//         />
//       ))}
//     </div>
//   );
// };

// export default ArchiveContainer;

import React from 'react';
import NoteCard from '../NoteCard/NoteCard';
import './ArchiveContainer.scss';
import { useNotes } from '../../context/NotesContext';

const ArchiveContainer = () => {
  const { notes, updateNoteList } = useNotes();
  const archivedNotes = notes.filter((note) => note.isArchive).reverse();

  return (
    <div className='notes-main-container'>
      {archivedNotes.map((note, index) => (
        <NoteCard
          key={note._id || index}
          title={note.title}
          description={note.description}
          noteDetails={note}
          updateList={updateNoteList}
        />
      ))}
    </div>
  );
};

export default ArchiveContainer;