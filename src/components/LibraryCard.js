import React, { useState } from "react";

import StarRatingComponent from 'react-star-rating-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { db } from '../firebase';
import { updateDoc, deleteDoc, doc } from "firebase/firestore";


function LibraryCard({item, deleteToast, updateToast}) {

    const [rating, setRating] = useState(parseInt(item.data.rating));
    const [genre, setGenre] = useState(item.data.genre);
    const [description, setDescription] = useState(item.data.review);
    const [startDate, setStartDate] = useState(item.data.startDate);
    const [endDate, setEndDate] = useState(item.data.endDate);
    const [disableEdit, setDisableEdit] = useState(true);

    const updateBook = () => {

        const bookDoc = doc(db, "books", item.id);
        const data =  
                    {
                        rating: rating,
                        genre: genre,
                        review: description,
                        startDate: startDate,
                        endDate: endDate
                    };

        const update = async () => {
            await updateDoc(bookDoc, data);
        }

        update();
        updateToast();
    }

    const deleteBook = () => {

        const bookDoc = doc(db, "books", item.id);
        const deleteBookItem = async () => {
            await deleteDoc(bookDoc);
        }

        deleteBookItem();
        deleteToast();
    }

    return ( 
        <div key={item.id} className="libraryCard" id={item.id} >

            <div className="libraryThumbnail">
                <img src={item.data.image} alt=""/>
                {
                     item.data.endDate !== '' &&
                        
                        <div className="finishedCheck"><FontAwesomeIcon style={{width: '35px', height: '35px', color: 'white', margin: 'auto', padding: '5px'}} icon={faCheck} /></div>
                }
            </div>
            {
                <div className="libraryBody">
                    <div>
                        <h2 style={{textAlign:'center'}}>{item.data.title}</h2>
                        <h3 style={{textAlign:'center'}}>{item.data.author}</h3>
                        <div style={{width: '100%', height: '2px', backgroundColor:'teal', marginTop:'1rem'}}></div>
                    </div>
                    <div className="flexRowEven">
                        <div className="flexColumnCenter">
                            <div>My Rating</div>
                            <StarRatingComponent 
                                name="rate1" 
                                starCount={5}
                                value={rating}
                                onStarClick={(nextValue, prevValue, name) => setRating(nextValue)}
                            />
                        </div>
                        <div className="flexColumnCenter">
                            <div>Global Rating</div>
                            <StarRatingComponent 
                                name="rate1" 
                                starCount={5}
                                value={parseInt(item.data.globalRating)}
                            />
                        </div>
                    </div>
                    <div>
                        <div>Genre</div>
                        <input className={'libraryInput'} defaultValue={item.data.genre} onChange={(e) => setGenre(e.target.value)} />
                    </div>
                    <div>
                        <div>Pages</div>
                        <input className={'libraryInput'} defaultValue={item.data.pages} disabled={disableEdit} />
                    </div>
                    <div>
                        <div>Started</div>
                        <input className={'libraryInput'} id="startPicker" type="date" defaultValue={item.data.startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <div>Finished</div>
                        <input className={'libraryInput'} id="endPicker" type="date" defaultValue={item.data.endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div>
                        <textarea className="libraryDescription" defaultValue={item.data.review} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignContent:'center'}}>
                        <button className="libraryUpdate" onClick={() => updateBook()}>Update</button>
                        <button className="libraryDelete" onClick={() => deleteBook()}>Delete</button>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default LibraryCard;