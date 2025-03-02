import React, { useState } from 'react';
import './NoteCard.scss';
import { BellPlus, UserPlus, Image, FolderDown, ArchiveRestore, Trash2, Palette } from 'lucide-react';
import LongMenu from './LongMenu';
import { archiveNoteApi, changeColorAPI, deleteNoteForeverApi, trashNoteApi } from '../../utils/API';
import Modal from '@mui/material/Modal';
import AddNote from '../AddNote/AddNote';
import { useNavigate } from 'react-router-dom';

const MAX_DESCRIPTION_LENGTH = 125;
const MAX_TITLE_LENGTH = 50;

const NoteCard = ({ title, description = "", noteDetails, updateList }) => {
    // console.log("NoteCard props:", { title, description, noteDetails, updateList }); // Debug props
    const navigate = useNavigate();

    const [editNote, setEditNote] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [selectedColor, setSelectedColor] = useState(noteDetails?.color || '#FFFFFF');

    const colors = [
        "#FFFFFF", "#FAAFA8", "#F39F76", "#FFF8B8",
        "#E2F6D3", "#B4DDD3", "#D4E4ED", "#AECCDC",
        "#D3BFDB", "#F6E2DD", "#E9E3D4", "#EFEFF1"
    ];

    // Ensure description is a string, fallback to empty string if undefined
    const safeDescription = description || "";
    const isLongDescription = safeDescription.length > MAX_DESCRIPTION_LENGTH;
    const isLongTitle = title?.length > MAX_TITLE_LENGTH;
    const truncatedDescription = isLongDescription ? safeDescription.substring(0, MAX_DESCRIPTION_LENGTH) + "..." : safeDescription;
    const truncatedTitle = isLongTitle ? title.substring(0, MAX_TITLE_LENGTH) + "..." : title;


    const handleIconClick = async (action, data = null) => {
        if (action === 'edit') {
            setEditNote(false);
            updateList({ action: 'edit', data });
            return;
        }
        try {
            console.log("noteDetails:", noteDetails);
            if (!noteDetails || !noteDetails._id) {
                console.error("Note details or _id is missing:", noteDetails);
                return;
            }
            console.log("Note _id for action:", noteDetails._id);
    
            if (action === 'archive') {
                const newIsArchived = !noteDetails.isArchived;
                await archiveNoteApi({
                    "noteIdList": [noteDetails._id],
                    "isArchived": newIsArchived // This becomes isArchive in the API
                });
                updateList({ action: "archive", data: { ...noteDetails, isArchived: newIsArchived } });
            } else if (action === 'trash') {
                const newIsDeleted = !noteDetails.isDeleted;
                await trashNoteApi({
                    "noteIdList": [noteDetails._id],
                    "isDeleted": newIsDeleted // Maps to isTrash in API
                });
                updateList({ action: "trash", data: { ...noteDetails, isDeleted: newIsDeleted } });
            } else if (action === 'deleteForever') {
                await deleteNoteForeverApi({ "noteIdList": [noteDetails._id] });
                updateList({ action: "trash", data: { ...noteDetails, isDeleted: false } });
            } else if (action === 'color') {
                setShowColors(false);
                await changeColorAPI({ "noteIdList": [noteDetails._id], color: data });
                updateList({ action: 'color', data: { ...noteDetails, color: selectedColor } });
            }
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };

    return (
        <div
            className={`note-card-main-container ${isLongDescription ? 'expanded-card' : ''}`}
            style={{ backgroundColor: selectedColor }}
        >
            <div className='card-container-info' onClick={() => {
                setEditNote(true);
                navigate(`/dashboard/notes/${noteDetails.id}`);
            }}>
                <h3 className='card-title'>{truncatedTitle}</h3>
                <p className='card-desc'>{truncatedDescription}</p>
            </div>
            <div className='card-container-options'>
                {noteDetails?.isDeleted ? (
                    <>
                        <ArchiveRestore className='icons' onClick={() => handleIconClick('trash')} />
                        <Trash2 className='icons' onClick={() => handleIconClick('deleteForever')} />
                    </>
                ) : (
                    <>
                        <BellPlus className='icons' />
                        <UserPlus className='icons' />
                        <Image className='icons' />
                        <div className="color-picker-container">
                            <Palette className='icons' onClick={() => setShowColors(!showColors)} />
                            {showColors && (
                                <div className="color-picker">
                                    {colors.map((color) => (
                                        <div
                                            key={color}
                                            className="color-option"
                                            style={{ backgroundColor: color }}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                handleIconClick('color', color);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
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