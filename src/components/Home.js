import React, {useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Banner from "./Banner";
import BookSearch from './BookSearch';
import AddBookModal from './AddBookModal';
import MyLibrary from "./MyLibrary";
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import { collection, query, onSnapshot } from "firebase/firestore";


function Home()
{
    const [selectedBook, setSelectedBook] = useState();
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [myBooks, setMyBooks] = useState([]);

    const bookCollectionRef = collection(db, "books");
   
    // const { user, auth } = useUserAuth();

    const successToast = () => toast("Successfully Added Book!", {
        duration: 4000,
        position: 'top-center',
        icon: '👍',
        className: 'toast'
    });

    const deleteToast = () => toast("Successfully Deleted Book!", {
        duration: 4000,
        position: 'top-center',
        icon: '👍',
        className: 'toast'
    });

    const updateToast = () => toast("Successfully Updated Book!", {
        duration: 4000,
        position: 'top-center',
        icon: '👍',
        className: 'toast'
    });

    useEffect(() => {

        // const getBooks = async () => {
        //     const data = await getDocs(bookCollectionRef)
        //         console.log("BOOKS: " + JSON.stringify(data));
        //     const books = data.docs.map(doc => {
        //         return { 
        //             id : doc.id,
        //             data: doc.data()
        //         }
        //     });

        //     setMyBooks(books);
        // }

        // getBooks();

        const q = query(collection(db, "books"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const books = [];
    
            querySnapshot.forEach((doc) => {
                books.push({ id: doc.id, data: doc.data() });
            });
    
            setMyBooks(books);
        })

    }, [])

    // const q = query(collection(db, "books"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     const books = [];

    //     querySnapshot.forEach((doc) => {
    //         books.push({ id: doc.id, data: doc.data() });
    //     });

    //     setMyBooks(books);
    // })

    return (
        <>            
            <Banner />
            <BookSearch setSelectedBook={setSelectedBook} setShowAddBookModal={setShowAddBookModal}/>
            <AddBookModal selectedBook={selectedBook} show={showAddBookModal} setShowAddBookModal={setShowAddBookModal} successToast={successToast}/>
        
        
            <MyLibrary books={myBooks} deleteToast={deleteToast} updateToast={updateToast}/>
            <Toaster />
        </>
    )
    
}


export default Home;