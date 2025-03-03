import React, { useMemo } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import NoteCard from '../NoteCard/NoteCard';
import './MasonryGrid.scss'; // Ensure this SCSS file exists

const MasonryGrid = ({ notes, updateList }) => {
    // Calculate effective width, accounting for sidebar (20% when open, 0% when closed)
    const sidebarWidth = 20; // Assuming sidebar is 20% of viewport width when open
    const containerWidth = window.innerWidth * (1 - sidebarWidth / 100); // Remaining width for notes
    const innerPadding = 10; // 5px padding on each side, doubled for total
    const effectiveWidth = containerWidth - (2 * innerPadding); // Width after padding

    // Dynamically determine column count based on effective width and desired gap
    const gap = 25; // Consistent gap between cards
    const minCardWidth = 300; // Minimum width per card
    const maxCardWidth = 400; // Maximum width per card
    const columns = useMemo(() => {
        const availableWidth = effectiveWidth;
        const columnsCount = Math.floor(availableWidth / (minCardWidth + gap));
        return Math.max(1, Math.min(columnsCount, 5)); // Cap at 5 columns, ensure at least 1
    }, [effectiveWidth]);

    // Adjust card width based on available space and column count
    const cardWidth = Math.min(
        maxCardWidth,
        Math.max(minCardWidth, (effectiveWidth - (columns - 1) * gap) / columns)
    );

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{
                280: 1, // Very small screens (e.g., mobile in portrait)
                480: 2, // Small screens (e.g., mobile in landscape)
                768: 3, // Tablets
                1024: 4, // Small desktops
                1440: 5, // Large desktops
            }}
        >
            <Masonry gutter={gap}>
                {notes.map((note, index) => (
                    <div key={note._id || index} className="masonry-item" style={{ width: `${cardWidth}px` }}>
                        <NoteCard
                            title={note.title}
                            description={note.description}
                            noteDetails={note}
                            updateList={updateList}
                        />
                    </div>
                ))}
            </Masonry>
        </ResponsiveMasonry>
    );
};

export default MasonryGrid;