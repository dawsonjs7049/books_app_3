import React, { useState, useEffect } from "react";

import LibraryCard from "../components/LibraryCard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCommentDollar } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'

function MyLibrary({books, deleteToast, updateToast}) {

    const [sortedBooks, setSortedBooks] = useState([]);
    const [sortType, setSortType] = useState('title');
    
    const sortOptions = [
        { value: 'title', label: 'Title' },
        { value: 'author', label: 'Author' },
        { value: 'rating', label: 'Rating' },
        { value: 'finished', label: 'Finished' },
        { value: 'unfinished', label: 'Unfinished' },
        { value: 'date_started', label: 'Date Started' },
        { value: 'date_finished', label: 'Date Finished' }
    ]

    let originalBooks = books;

    useEffect(() => {

        originalBooks = books;

        switch(sortType) {
            case 'title':
                sortByTitle();
                break;
            case 'author':
                sortByAuthor();
                break;
            case 'date_started':
                sortByDayStarted();
                break;
            case 'date_finished':
                sortByDayFinished();
                break;
            case 'finished':
                sortByFinished();
                break;
            case 'unfinished':
                sortByUnfinished();
                break;
            case 'rating':
                sortByRating();
                break;
            default:
                sortByTitle();
                break;
        }

    }, [books])

    const handleSortSelect = (event) => {

        setSortType(event.value);

        handleSort(event.value);
    }

    const handleSort = (type) => {

        switch(type) {
            case 'title':
                sortByTitle();
                break;
            case 'author':
                sortByAuthor();
                break;
            case 'date_started':
                sortByDayStarted();
                break;
            case 'date_finished':
                sortByDayFinished();
                break;
            case 'finished':
                sortByFinished();
                break;
            case 'unfinished':
                sortByUnfinished();
                break;
            case 'rating':
                sortByRating();
                break;
            default:
                sortByTitle();
                break;
        }

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

        setSortedBooks([...sorted]);
    }

    const sortByFinished = () => {
        let filtered = [];

        filtered = originalBooks.filter((book) => book.data.endDate != '');

        setSortedBooks([...filtered]);
    }

    const sortByUnfinished = () => {
        let filtered = [];

        filtered = originalBooks.filter((book) => book.data.endDate == '');

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

        // books = sorted;
        setSortedBooks([...sorted]);
    }

    const handleLibrarySearch = (e) => {
        let input = e.target.value;
       

        if(input != '')
        {
            let searchWords = e.target.value.split(" ");

            searchWords = searchWords.filter(word => word.length > 1);

            if(searchWords.length > 0)
            {
                let filtered = originalBooks.filter((book) => {
                    let title = book.data.title.toLowerCase();
                    let author = book.data.author.toLowerCase();
    
                    return searchWords.some(searchWord => {
                        return (title.includes(searchWord.toLowerCase()) || author.includes(searchWord.toLowerCase()))
                    })
                });
                    
                setSortedBooks([...filtered]);
            }
        }
        else
        {
            let select = document.getElementById('sortSelect');
            select.value = 'Title';

            handleSort();
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
            <h1 style={{width: '100%', textAlign:'center', color: 'white'}}>My Library <FontAwesomeIcon icon={faBookmark} /></h1>
            <div className="libraryBar"></div>
            <div className="librarySearchContainer">
                <div className="libraryInputContainer">
                    <input type="text" className="librarySearchInput" id="librarySearch" onChange={(e) => handleLibrarySearch(e)} placeholder="Search by Title/Author"></input>
                    <button className="cancelSearchBtn" onClick={() => handleClearSearch()}>X</button>
                </div>
                <div>
                    <Select className="librarySelect" id="sortSelect" options={sortOptions} onChange={(event) => handleSortSelect(event)} />
                </div>
                
            </div>
            <div className="libraryCards">
            {
                
                sortedBooks ?
                    sortedBooks.map((item) => (
                        <LibraryCard item={item} key={item.id} deleteToast={deleteToast} updateToast={updateToast}/>
                    ))
                
                :
                    "EMPTY"
            }
            </div>
        </div>
    );
}

export default MyLibrary;