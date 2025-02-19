import React, { useState } from 'react';
import './TakeNote.scss';
import { TextField, Button, IconButton } from '@mui/material';
import { NotificationsNone, PersonAdd, Palette, Image, Archive, MoreVert, Undo, Redo } from '@mui/icons-material';

function TakeNote() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="take-note-wrapper-main">
            <div
                className={`take-note-container ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(true)}
            >
                {!isExpanded ? (
                    <TextField fullWidth placeholder="Take a note..." variant="outlined" size="small" />
                ) : (
                    <div className='take-note-content' onClick={(e) => e.stopPropagation()}>
                        <TextField fullWidth placeholder="Title" variant="standard" className='title-field' />
                        <TextField fullWidth placeholder="Take a note..." variant="standard" className='note-field' multiline />

                        <div className='note-actions'>
                            <div className='left-actions'>
                                <IconButton><NotificationsNone /></IconButton>
                                <IconButton><PersonAdd /></IconButton>
                                <IconButton><Palette /></IconButton>
                                <IconButton><Image /></IconButton>
                                <IconButton><Archive /></IconButton>
                                <IconButton><MoreVert /></IconButton>
                                <IconButton><Undo /></IconButton>
                                <IconButton><Redo /></IconButton>
                            </div>
                            <Button onClick={() => setIsExpanded(false)}>Close</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TakeNote;
