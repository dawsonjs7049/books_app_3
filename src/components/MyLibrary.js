import React, { useState, useEffect } from "react";

import StarRatingComponent from 'react-star-rating-component';
import LibraryCard from "../components/LibraryCard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

function MyLibrary({books, deleteToast, updateToast}) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [disableEdit, setDisableEdit] = useState(true);

    const [sortedBooks, setSortedBooks] = useState([]);
    
    let originalBooks = books;
    
    useEffect(() => {

        originalBooks = books;

        let select = document.getElementById('sortSelect');
        let sort = select.value; 

        switch(sort) {
            case 'Title':
                sortByTitle();
                break;
            case 'Author':
                sortByAuthor();
                break;
            case 'Date Started':
                sortByDayStarted();
                break;
            case 'Date Finished':
                sortByDayFinished();
                break;
            case 'Finished':
                sortByFinished();
                break;
            case 'Unfinished':
                sortByUnfinished();
                break;
            case 'Rating':
                sortByRating();
                break;
            default:
                sortByTitle();
                break;
        }

        console.log("SORT VALUE: " + sort);
        console.log("BOOKS AFTER EFFECT SORT: " + JSON.stringify(books));
    }, [books])

    const handleSort = (type) => {
        let select = document.getElementById('sortSelect');
        let sort = select.value; 

        switch(type) {
            case 'Title':
                sortByTitle();
                break;
            case 'Author':
                sortByAuthor();
                break;
            case 'Date Started':
                sortByDayStarted();
                break;
            case 'Date Finished':
                sortByDayFinished();
                break;
            case 'Finished':
                sortByFinished();
                break;
            case 'Unfinished':
                sortByUnfinished();
                break;
            case 'Rating':
                sortByRating();
                break;
            default:
                sortByTitle();
                break;
        }

        console.log("SORT VALUE: " + sort);
        console.log("BOOKS AFTER EFFECT SORT: " + JSON.stringify(books));
    }

    const sortByTitle = () => {

        let sorted = [];

        sorted = originalBooks.sort((a,b) => {
            let title1 = a.data.title.toLowerCase();
            let title2 = b.data.title.toLowerCase();

            if(title1 < title2) { return -1 }
            if(title1 > title2) { return 1 }

            return 0;
        });
        console.log("AFTER TITLE SORT: " + JSON.stringify(sorted));

        // books = sorted;
        setSortedBooks([...sorted]);
    }

    const sortByAuthor = () => {
        let sorted = [];

        sorted = originalBooks.sort((a,b) => {
            let author1 = a.data.author.toLowerCase();
            let author2 = b.data.author.toLowerCase();

            if(author1 < author2) { return -1 }
            if(author1 > author2) { return 1 }

            return 0;
        });
        console.log("AFTER AUTHOR SORT: " + JSON.stringify(sorted));
        // books = sorted;
        setSortedBooks([...sorted]);
    }

    const sortByDayStarted = () => {
        let sorted = [];

        sorted = originalBooks.sort((a,b) => {
            let date1 = a.data.startDate;
            let date2 = b.data.startDate;

            if(date1 < date2) { return -1 }
            if(date1 > date2) { return 1 }

            return 0;
        });
        console.log("AFTER DAY STARTED SORT: " + JSON.stringify(sorted));
        setSortedBooks([...sorted]);
    }

    const sortByDayFinished = () => {
        let sorted = [];

        sorted = originalBooks.sort((a,b) => {
            let date1 = a.data.endDate;
            let date2 = b.data.endDate;

            if(date1 < date2) { return -1 }
            if(date1 > date2) { return 1 }

            return 0;
        });
        console.log("AFTER DAY FINISHED SORT: " + JSON.stringify(sorted));
        setSortedBooks([...sorted]);
    }

    const sortByFinished = () => {
        let filtered = [];

        filtered = originalBooks.filter((book) => book.data.endDate != '');

        console.log("AFTER FILTER BY FINISHED: " + JSON.stringify(filtered));
        setSortedBooks([...filtered]);
    }

    const sortByUnfinished = () => {
        let filtered = [];

        filtered = originalBooks.filter((book) => book.data.endDate == '');

        console.log("AFTER FILTER BY UNFINISHED: " + JSON.stringify(filtered));
        setSortedBooks([...filtered]);
    }

    const sortByRating = () => {
        let sorted = [];

        sorted = originalBooks.sort((a,b) => {
            let rating1 = a.data.rating;
            let rating2 = b.data.rating;

            if(rating1 < rating2) { return 1 }
            if(rating1 > rating2) { return -1 }

            return 0;
        });
        console.log("AFTER RATING SORT: " + JSON.stringify(sorted));

        // books = sorted;
        setSortedBooks([...sorted]);
    }

    const handleLibrarySearch = (e) => {
        let input = e.target.value;
       

        if(input != '')
        {
            let searchWords = e.target.value.split(" ");

            searchWords = searchWords.filter(word => word.length > 1);
            console.log("SEARCH WORDS: " + JSON.stringify(searchWords));
            // let searchWords = e.target.value.split(" ");
            if(searchWords.length > 0)
            {
                let filtered = originalBooks.filter((book) => {
                    let title = book.data.title.toLowerCase();
                    let author = book.data.author.toLowerCase();
                    console.log("TITLE: " + title + " - AUTHOR: " + author);
    
                    return searchWords.some(searchWord => {
                        console.log("SEARCH WORD: " + searchWord + " - TITLE: " + title + " - AUTHOR: " + author);
                        return (title.includes(searchWord.toLowerCase()) || author.includes(searchWord.toLowerCase()))
                    })
                });
                    
                console.log("SEARCH FILTERED: " + JSON.stringify(filtered));
                setSortedBooks([...filtered]);
            }
        }
        else
        {
            let select = document.getElementById('sortSelect');
            select.value = 'Title';

            handleSort();
            // setSortedBooks([...originalBooks])
        }
    }

    const handleClearSearch = () => {
        let input = document.getElementById('librarySearch');
        let select = document.getElementById('sortSelect');

        input.value = '';
        select.value = 'Title';

        handleSort();
    }

 
    return (
        <div className="libraryContainer">
            <h1 style={{width: '100%', textAlign:'center', color: 'white'}}>My Library <FontAwesomeIcon icon={faBook} /></h1>
            <div className="libraryBar"></div>
            <div className="librarySearchContainer">
                <div className="libraryInputContainer">
                    <input type="text" className="librarySearchInput" id="librarySearch" onChange={(e) => handleLibrarySearch(e)} placeholder="Search by Title/Author"></input>
                    <button className="cancelSearchBtn" onClick={() => handleClearSearch()}>X</button>
                </div>
                <div>
                    <select className="librarySelect" id="sortSelect">
                        <option onClick={() => sortByTitle()}>Title</option>
                        <option onClick={() => sortByAuthor()}>Author</option>
                        <option onClick={() => sortByRating()}>Rating</option>
                        <option onClick={() => sortByFinished()}>Finished</option>
                        <option onClick={() => sortByUnfinished()}>Unfinished</option>
                        <option onClick={() => sortByDayStarted()}>Date Started</option>
                        <option onClick={() => sortByDayFinished()}>Date Finished</option>
                    </select>
                </div>
                
            </div>
            <div className="libraryCards">
            {
                
                sortedBooks ?
                    sortedBooks.map((item) => (
                        <LibraryCard item={item} key={item.id} deleteToast={deleteToast} updateToast={updateToast}/>
                    ))
                // books.length > 0 ?
                //     books.map((item) => (
                //         <LibraryCard item={item} key={item.id}/>
                //     ))
                
                :
                    "EMPTY"
            }
            </div>
        </div>
    );
}

export default MyLibrary;