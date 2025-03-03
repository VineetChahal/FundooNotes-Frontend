import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import './ColorPicker.scss';

const ColorPicker = ({ onColorSelect, initialColor = '#FFFFFF' }) => {
    const [showColors, setShowColors] = useState(false);
    const [selectedColor, setSelectedColor] = useState(initialColor);

    const colors = [
        "#FFFFFF","#FAAFA8","#F39F76", "#FFF8B8",
        "#E2F6D3", "#B4DDD3", "#D4E4ED", "#AECCDC",
        "#D3BFDB", "#F6E2DD", "#E9E3D4", "#EFEFF1",
    ];

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setShowColors(false);
        if (onColorSelect) {
            onColorSelect(color);
        }
    };

    return (
        <div className="color-picker-container">
            <Palette className="icons" onClick={() => setShowColors(!showColors)} />
            <div className="selected-color" style={{ backgroundColor: selectedColor }} />
            {showColors && (
                <div className="color-picker">
                    {colors.map((color) => (
                        <div
                            key={color}
                            className="color-option"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelect(color)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorPicker;