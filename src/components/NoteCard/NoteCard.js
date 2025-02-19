import React, { useState } from "react";
import "./NoteCard.scss";
import { IconButton, TextField, Button } from "@mui/material";
import { NotificationsNone, PersonAdd, Palette, Image, Archive, MoreVert, Undo, Redo } from "@mui/icons-material";

function NoteCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="note-card-container">
      <div
        className={`note-card ${isExpanded ? "expanded" : ""}`}
        onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {!isExpanded ? (
          <>
            <TextField placeholder="Title" fullWidth variant="standard" className="note-title" />
            <TextField placeholder="Take a note..." fullWidth variant="standard" className="note-content" />
            <div className="note-footer">
              <IconButton><NotificationsNone /></IconButton>
              <IconButton><PersonAdd /></IconButton>
              <IconButton><Palette /></IconButton>
              <IconButton><Image /></IconButton>
              <IconButton><Archive /></IconButton>
              <IconButton><MoreVert /></IconButton>
            </div>
          </>
        ) : (
          <div className="note-expanded" onClick={(e) => e.stopPropagation()}>
            <TextField fullWidth variant="standard" className="title-field" placeholder="Title" />
            <TextField fullWidth multiline variant="standard" className="note-field" placeholder="Take a note..." />
            <div className="note-footer-expanded">
              <div className="left-actions">
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

export default NoteCard;
