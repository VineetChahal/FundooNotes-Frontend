import React, { useEffect, useRef, useState } from "react";
import "./Navbar.scss";
import { Menu, RotateCw, Settings, Rows2, Search } from "lucide-react";
import AccountMenu from "./AccountMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";
import CircularProgress from '@mui/material/CircularProgress'; // For loader

function Navbar({ toggleSidebar }) {
    const [navTitle, setNavTitle] = useState("Keep");
    const { setSearchedText, searchedText, refreshNotes, loading } = useNotes();
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split("/")[2];
    const previousPath = useRef(""); // Track previous path to prevent duplicate refreshes

    useEffect(() => {
        if (path === "") setNavTitle("Keep");
        else if (path === "notes") setNavTitle("Notes");
        else if (path === "archive") setNavTitle("Archive");
        else if (path === "trash") setNavTitle("Trash");
        
        // Refresh notes only if the path changes (not on re-renders or duplicates)
        if (path && path !== previousPath.current) {
            refreshNotes();
            previousPath.current = path; // Update previous path
        }
    }, [path, refreshNotes]); // Trigger on route change

    const handleRefresh = () => {
        refreshNotes(); // Manual refresh on icon click
    };

    return (
        <div className="dashboard-header">
            <div className="header-left">
                <div className="dashboard-header-left-container">
                    <div className="header-left-container-menu">
                        <Menu className="header-icons" onClick={toggleSidebar} />
                    </div>
                    <div className="header-left-container-logo">
                        <img
                            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                            alt="Not Found"
                            onClick={() => {
                                setSearchedText("");
                                navigate("/dashboard/notes"); // Navigate to Notes on logo click
                            }}
                        />
                    </div>
                    <div className="header-left-container-title" onClick={() => {
                        setSearchedText("");
                        navigate("/dashboard/notes"); // Navigate to Notes on title click
                    }}>
                        {navTitle}
                    </div>
                </div>
            </div>
            <div className="header-right">
                <div className="dashboard-header-middle-container">
                    <div className="header-middle-search-icon">
                        <Search className="search-icon" />
                    </div>
                    <input
                        value={searchedText}
                        onChange={(e) => setSearchedText(e.target.value)}
                        className="header-middle-search-input"
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <div className="dashboard-header-right-container">
                    <div className="header-right-container-icons">
                        <div className="icon-div">
                            <button className="refresh-icon" onClick={handleRefresh} disabled={loading}>
                                {loading ? <CircularProgress size={20} /> : <RotateCw className="header-icons" />}
                            </button>
                        </div>
                        <div className="icon-div row-icon">
                            <Rows2 className="header-icons" />
                        </div>
                        <div className="icon-div">
                            <Settings className="header-icons" />
                        </div>
                    </div>
                    <div className="header-right-container-account">
                        <AccountMenu /> {/* No changes needed here, just using updated AccountMenu */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;