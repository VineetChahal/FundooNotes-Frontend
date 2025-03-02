// import React, { useEffect, useState } from 'react';
// import { getNotes } from '../../utils/API';
// import NoteCard from '../NoteCard/NoteCard';

// const TrashContainer = () => {
//   const [notes, setNotes] = useState([]);

//   const fetchNotes = async () => {
//     try {
//       const response = await getNotes();
//       console.log("TrashContainer fetchNotes response:", response.data);
//       let deletedNotes = (response?.data?.notes || []).filter((note) => note.isTrash); // Use isTrash
//       setNotes(deletedNotes.reverse());
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const updateNoteList = async (response) => {
//     const { action, data } = response;
//     if (action === 'trash') {
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

// export default TrashContainer;
import React from 'react';
import NoteCard from '../NoteCard/NoteCard';
import { useNotes } from '../../context/NotesContext';

const TrashContainer = () => {
  const { notes, updateNoteList } = useNotes();
  const trashedNotes = notes.filter((note) => note.isTrash).reverse();

  return (
    <div className='notes-main-container'>
      {trashedNotes.map((note, index) => (
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

export default TrashContainer;