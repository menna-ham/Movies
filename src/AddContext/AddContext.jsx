import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

export let AddContext= createContext(0);

export default function AddContextProvider(props){

    let [favList, setFavList] = useState([]);
    let [favItem,setFavItem] = useState({})

    return(

        <AddContext.Provider value={{favList,favItem}}>
            {props.children}

        </AddContext.Provider>
    )

}