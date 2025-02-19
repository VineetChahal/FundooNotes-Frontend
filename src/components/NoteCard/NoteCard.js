import "./NoteCard.scss";
import { Button } from "@mui/material";
import { useState } from "react";

function Notecard({ title, description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`notecard-container ${isExpanded ? "expanded" : ""}`}>
      <div className="notecard">
        
        {/* Notecard Content */}
        <div className="notecard-content">
          <span id="notecard-title">{title}</span>
          <span id="notecard-description">{description}</span>
        </div>

        {/* Footer Buttons (Only Visible on Hover) */}
        <div className="notecard-footer">
          <Button variant="contained">Action 1</Button>
          <Button variant="contained">Action 2</Button>
          <Button variant="contained">Action 3</Button>
          <Button variant="contained">Action 4</Button>
          <Button variant="contained">Action 5</Button>
          <Button variant="contained">Action 6</Button>
        </div>
      </div>

      {/* Popup Effect */}
      {isExpanded && (
        <div className="notecard-popup" onClick={() => setIsExpanded(false)}>
          <div className="popup-content">
            <span id="popup-title">{title}</span>
            <span id="popup-description">{description}</span>
            <div className="popup-footer">
              <Button variant="contained">Action 1</Button>
              <Button variant="contained">Action 2</Button>
              <Button variant="contained">Action 3</Button>
              <Button variant="contained">Action 4</Button>
              <Button variant="contained">Action 5</Button>
              <Button variant="contained">Action 6</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notecard;
