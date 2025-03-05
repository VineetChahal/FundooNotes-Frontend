import React, { useRef, useEffect } from 'react';
import './ExpandedAddNote.scss';
import { BellPlus, UserPlus, Image, FolderDown, EllipsisVertical } from 'lucide-react';
import ColorPicker from '../ColorPicker/ColorPicker';

function ExpandedAddNote({ toggleView, setFunctions, values = null, selectedColor , handleColorSelect}) {
    // console.log("ExpandedAddNote props - handleIconClick:", handleIconClick); // Debug prop
    const numLines = values.description ? values.description.split('\n').length : 1;
    const lineHeight = 20;
    const newHeight = Math.min(numLines, 25) * lineHeight;

    // Create a ref for the ExpandedAddNote container
    const wrapperRef = useRef(null);

    // Effect to handle clicks outside the component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                toggleView(); // Close the note when clicking outside
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up the event listener on unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleView]); // Re-run if toggleView changes

    return (
        <div className='expended-main-container' ref={wrapperRef} style={{ backgroundColor: selectedColor || '#FFFFFF' }}>
            <div className='expended-title'>
                <input 
                    value={values.title || ''} 
                    className='title' 
                    type='text' 
                    placeholder='Title' 
                    onChange={(e) => setFunctions.setTitle(e.target.value)} 
                />
            </div>
            <div className='expended-note note'>
                <textarea
                    value={values.description || ''} 
                    className='note-textarea'
                    placeholder='Take a Note...'
                    onChange={(e) => setFunctions.setDescription(e.target.value)}
                    style={{ 
                        height: `${newHeight}px`, 
                        overflowY: numLines > 25 ? 'auto' : 'hidden' 
                    }}
                />
            </div>
            <div className='expended-options'>
                <div className='options-left'>
                    <BellPlus className='expended-icons' />
                    <UserPlus className='expended-icons' />
                    <Image className='expended-icons' />
                    <span 
                    
                    style={{border: '1px solid gray', borderRadius: '100%', cursor: 'pointer', height: '20px', width: '20px'}}

                    >
                        
                    <ColorPicker
                        onColorSelect={(color) => {
                            handleColorSelect(color); 
                        }} 
                        initialColor={selectedColor || '#FFFFFF'} 
                        className="expended-icons" 
                        />
                        </span>
                    <FolderDown className='expended-icons' />
                    <EllipsisVertical className='expended-icons' />
                </div>
                <div className='options-right'>
                    <p onClick={toggleView}>Close</p>
                </div>
            </div>
        </div>
    );
}

export default ExpandedAddNote;