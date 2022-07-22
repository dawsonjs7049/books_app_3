import styles from '../styles/Login.module.css';
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from '../context/UserAuthContext';

export default function Home() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const { login } = useUserAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try 
        {
            await login(email, password);
            navigate("/");
        }
        catch (error)
        {
            setError(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.h1}>Bookshelf</h1>
                <div style={{height: '2px', backgroundColor: 'black', width: '85%', margin: 'auto'}}></div>
                <h2 className={styles.h1}>Login</h2>
                <div style={{textAlign:'center', backgroundColor: 'red', color: 'white', borderRadius: '5px', marginLeft: '10px', marginRight: '10px'}}>{error}</div>
                <div className={styles.inputsBox}>
                    <div className={styles.inputContainer}>
                        <div className={styles.label}>Email</div>
                        <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <div className={styles.underline}></div>
                    </div>
                    <div className={styles.inputContainer}>
                        <div className={styles.label}>Password</div>
                        <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className={styles.underline}></div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.loginBtn} disabled={((email === "") || (password === "")) ? true : false} onClick={(e) => handleLogin(e)}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}