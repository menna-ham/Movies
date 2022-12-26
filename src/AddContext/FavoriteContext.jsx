import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export let FavoriteContext = createContext(0)

export default function FavoriteContextProvider(props){
    let [FavList,setFavList] = useState([]);
    let joined, movieArr, tvArr, actArr=[];
    
    if(JSON.parse( localStorage.getItem('FavTvs'))!=null){
        tvArr = JSON.parse( localStorage.getItem('FavTvs'));
    }else{tvArr=[]}
    if(JSON.parse( localStorage.getItem('FavActors'))!=null)
    {
        actArr = JSON.parse( localStorage.getItem('FavActors'));
    }else{actArr=[]}
    if(JSON.parse( localStorage.getItem('FavMovies'))!=null)
    {
        movieArr = JSON.parse( localStorage.getItem('FavMovies'));
    }else{ movieArr=[]}




    function addFavorite(e,obj,type){
        // console.log(type);
        let ev = e.target;
        console.log(ev.classList);

        // joined = [movieArr,tvArr,actArr];
        // joined.map((j)=>{
        //     if(j!=null){
        //         joined=[...j]
        //     }
        // })
        // if(joined!=null){
        //     setFavList([...joined]);
        //     console.log(FavList);
        // }else{setFavList([])}

        if(FavList.length!=0){
            
           if(!FavList.includes(obj)){

            ev.classList.remove('bg-danger');
            ev.classList.add('bg-success');

            setFavList([...FavList,obj])
            FavListLocal(obj,type)

            console.log('added');
           }else{
            ev.classList.remove('bg-success');
            ev.classList.add('bg-danger');
            
            setFavList(FavList.filter((p)=>p.id!==obj.id))
            removeLocalfav(obj,type)

            console.log('removed');

           }
        }else{
            setFavList([...FavList,obj])
            FavListLocal(obj,type)
            console.log('added first cond');
        }
    }

    function FavListLocal(obj,type){

        if (type=='movie')
        {
            movieArr.push(obj)
            localStorage.setItem('FavMovies',JSON.stringify(movieArr))
            console.log('added local movies');

        }else if(type=='tv'){
            tvArr.push(obj)
            localStorage.setItem('FavTvs',JSON.stringify(tvArr))
            console.log('added local tv');

        }else{
            actArr.push(obj)
            localStorage.setItem('FavActors',JSON.stringify(actArr))
            console.log('added local Actors');        
        }
    }

    function removeLocalfav(obj,type){

        if (type=='movie')
        {
            // movieArr.filter((f)=>f.id!==obj.id)
            for(let i=0; i<movieArr.length; i++){
                if(movieArr[i].id==obj.id){
                    movieArr.splice(i,1)
                }
            }
            localStorage.setItem('FavMovies',JSON.stringify(movieArr))
            console.log('added local movies');

        }else if(type=='tv'){

            for(let i=0; i<tvArr.length; i++){
                if(tvArr[i].id==obj.id){
                    tvArr.splice(i,1)
                }
            }
            localStorage.setItem('FavTvs',JSON.stringify(tvArr))
            console.log('added local tv');

        }else{
            for(let i=0; i<actArr.length; i++){
                if(actArr[i].id==obj.id){
                    actArr.splice(i,1)
                }
            }
            localStorage.setItem('FavActors',JSON.stringify(actArr))
            console.log('removed local actors');
        }

    }
    function removeItem(e,obj){
        setFavList(FavList.filter((p)=>p.id!==obj.id))

    }

    useEffect(()=>{


    // console.log(joined);
    

    })
   
    return(
        <FavoriteContext.Provider value={{addFavorite,FavList,removeLocalfav ,removeItem}}>
            {props.children}
        </FavoriteContext.Provider>
    )
}