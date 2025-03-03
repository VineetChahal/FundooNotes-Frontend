import React, { useState } from 'react';
import './NoteCard.scss';
import { BellPlus, UserPlus, Image, FolderDown, ArchiveRestore, Trash2, FolderUp } from 'lucide-react';
import LongMenu from './LongMenu';
import { archiveNoteApi, changeColorAPI, deleteNoteForeverApi, trashNoteApi } from '../../utils/API';
import Modal from '@mui/material/Modal';
import AddNote from '../AddNote/AddNote';
import { useNavigate } from 'react-router-dom';
import ColorPicker from '../ColorPicker/ColorPicker'; 

const MAX_DESCRIPTION_LENGTH = 125;

const NoteCard = ({ title, description = "", noteDetails, updateList }) => {
    const navigate = useNavigate();

    const [editNote, setEditNote] = useState(false);
    const [selectedColor, setSelectedColor] = useState(noteDetails?.color || '#FFFFFF');

    const handleIconClick = async (action, data = null) => {
        if (action === 'edit') {
            setEditNote(false);
            updateList({ action: 'edit', data });
            return;
        }
        try {
            if (!noteDetails || !noteDetails._id) {
                console.error("Note details or _id is missing:", noteDetails);
                return;
            }
            // console.log("Note _id for action:", noteDetails._id);

            if (action === 'archive') {
                const newIsArchived = !noteDetails.isArchived;
                await archiveNoteApi({"noteIdList": [noteDetails._id], "isArchived": newIsArchived /* This becomes isArchive in the API */ });
                updateList({ action: "archive", data: { ...noteDetails, isArchived: newIsArchived } });
            } else if (action === 'unarchive') {
                const newIsArchived = false;
                await archiveNoteApi({"noteIdList": [noteDetails._id], "isArchived": newIsArchived});
                updateList({ action: "archive", data: { ...noteDetails, isArchived: newIsArchived } });
            } else if (action === 'trash') {
                const newIsTrash = !noteDetails.isTrash; // Updated to isTrash
                await trashNoteApi({"noteIdList": [noteDetails._id], "isTrash": newIsTrash /* Maps to isTrash in API*/});
                updateList({ action: "trash", data: { ...noteDetails, isTrash: newIsTrash } }); // Updated to isTrash
            } else if (action === 'deleteForever') {
                await deleteNoteForeverApi({ "noteIdList": [noteDetails._id] });
                updateList({ action: "trash", data: { ...noteDetails, isTrash: false } }); // Updated to isTrash
            } else if (action === 'color') {
                setSelectedColor(data); // Update selectedColor directly
                await changeColorAPI({ "noteIdList": [noteDetails._id], color: data });
                updateList({ action: 'color', data: { ...noteDetails, color: data } });
            }
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };

    return (
        <div
            className={`note-card-main-container ${description.length > MAX_DESCRIPTION_LENGTH ? 'expanded-card' : ''}`}
            style={{ backgroundColor: selectedColor }}
        >
            <div className='card-container-info' onClick={() => {
                setEditNote(true);
                navigate(`/dashboard/notes/${noteDetails._id}`);
            }}>
                <h3 className='card-title'>{title}</h3>
                <p className='card-desc'>{description.split('\n').map((line, index) => (
                    <span key={index}>{line}<br /></span>
                ))}</p>
            </div>
            <div className={`card-container-options ${noteDetails?.isTrash ? 'trash-icons' : ''}`}>
                {noteDetails?.isTrash ? (
                    <>
                        <ArchiveRestore className='icons' onClick={() => handleIconClick('trash')} />
                        <Trash2 className='icons' onClick={() => handleIconClick('deleteForever')} />
                    </>
                ) : noteDetails?.isArchive ? (
                    <>
                        <BellPlus className='icons' />
                        <UserPlus className='icons' />
                        <Image className='icons' />
                        <ColorPicker onColorSelect={(color) => handleIconClick('color', color)} initialColor={selectedColor} />
                        <FolderUp className='icons' onClick={() => handleIconClick('unarchive')} />
                        <div className="long-menu-container">
                            <LongMenu className='icons menu-icon' handleIconClick={handleIconClick} />
                        </div>
                    </>
                ) : (
                    <>
                        <BellPlus className='icons' />
                        <UserPlus className='icons' />
                        <Image className='icons' />
                        <ColorPicker onColorSelect={(color) => handleIconClick('color', color)} initialColor={selectedColor} />
                        <FolderDown onClick={() => handleIconClick('archive')} className='icons' />
                        <div className="long-menu-container">
                            <LongMenu className='icons menu-icon' handleIconClick={handleIconClick} />
                        </div>
                    </>
                )}
            </div>
            <Modal
                open={editNote}
                onClose={() => {
                    setEditNote(false);
                    navigate(`/dashboard/notes`);
                }}
                className="custom-modal"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddNote expanded={true} noteDetails={noteDetails} handleIconClick={handleIconClick} />
            </Modal>
        </div>
    );
};

export default NoteCard;