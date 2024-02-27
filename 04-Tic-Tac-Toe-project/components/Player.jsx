import { useState } from "react";

export default function Player({initialName,symbol,isActive,onChangeName}){
    const [playerName, setPlayerName ] = useState(initialName);
    const [isEditing, setIsEditing ] = useState(false);
    
    function handleEditClick(){
        setIsEditing(!isEditing);
        
        if(isEditing){
            onChangeName(symbol,playerName);
        }
    }
    function delValue(e){
        e.target.value="";
    }
    function handleChange(e){
        setPlayerName(e.target.value);
    }

    let editablePlayerName=<span className="player-name">{playerName}</span>;
    if(isEditing){
        editablePlayerName=<input type="text" required value={playerName} onClick={delValue} onChange={handleChange}/>;
    }

    return(
        <li className={isActive? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing? "Save" : "Edit"}</button>
        </li>
    );
}