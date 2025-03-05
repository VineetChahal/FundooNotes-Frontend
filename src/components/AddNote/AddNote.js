import React, { useState } from 'react';
import { addNoteApi, editNoteApi } from '../../utils/API';
import './AddNote.scss';
import ClosedAddNote from './ClosedAddNote';
import ExpandedAddNote from './ExpandedAddNote';
import { successToast } from '../../utils/Toast';

const AddNote = ({ updateList, expanded = false, noteDetails , handleIconClick}) => {
    // console.log("AddNote props - handleIconClick:", handleIconClick); // Debug prop
    const [title, setTitle] = useState(noteDetails ? noteDetails.title : "");
    const [description, setDescription] = useState(noteDetails ? noteDetails.description : "");
    const [color, setColor] = useState(noteDetails ? noteDetails.color : '#FFFFFF');
    const [isExpanded, setIsExpanded] = useState(expanded);

    const handleAddNote = () => {
        if (isExpanded && (title || description) && !noteDetails) {
            addNoteApi({ title, description, color })
                .then((response) => {
                    if (response.status !== 201 && response.status !== 200) {
                        throw new Error(response?.data?.message || "Failed to add note");
                    }
                    console.log("Add note response:", response.data);
                    const newNote = response.data.note;
                    updateList({ action: "add", data: newNote });
                    successToast("Note Created Successfully");
                })
                .catch((error) => {
                    console.error("Error Adding Note:", error);
                });

            setTitle('');
            setDescription('');
            setColor('#FFFFFF');
        }

        if (noteDetails) {
            if (!noteDetails._id) {
                console.error("Note details missing _id:", noteDetails);
                throw new Error("Cannot edit note: missing ID");
            }
            editNoteApi({ ...noteDetails, title, description, color, noteId: noteDetails._id })
                .then(() => {
                    handleIconClick('edit', { ...noteDetails, title, description, color, noteId: noteDetails._id });
                })
                .catch((error) => {
                    console.error("Error Editing Note:", error);
                });
        }

        setIsExpanded(prev => !prev);
    };
    function handleColorSelect (color){
        setColor(color);
    }

    return (
        <div className='addnote-main-container'>
            {isExpanded ? (
                <ExpandedAddNote 
                    toggleView={handleAddNote} 
                    setFunctions={{ setTitle, setDescription, setColor }} 
                    values={{ title, description, color }} 
                    handleColorSelect={handleColorSelect}
                    selectedColor={color}
                />
            ) : (
                <ClosedAddNote toggleView={handleAddNote} />
            )}
        </div>
    );
};

export default AddNote;