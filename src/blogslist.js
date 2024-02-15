import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import { BsTrashFill, BsPencilFill } from "react-icons/bs"
import fb from "./firebase";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const DB = fb.firestore()
const PersonalDevelopmentblogslist = DB.collection('PersonalDevelopment');

const BlogslistView = () => {
    const [blogs, Setblogs] = useState([]);
    useEffect(() => { 
        const unsubscribe = PersonalDevelopmentblogslist.limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            // Update state
            Setblogs(data);
        });

        // Detach listener
        return unsubscribe;
    }, []);

    const DeleteBlog = (id) => {
        PersonalDevelopmentblogslist.doc(id).delete().then(() => {
            // alert("Document successfully deleted!");
            toast.info("Article successfully deleted!", {
                position: toast.POSITION.TOP_CENTER,
              });
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };



   


    return (
        <div>




            
            <div className='table-wrapper'>
                <table className='table'>
                    <thead>
                        <tr>
                            {/* <th>Page</th> */}
                            <th className='expand'>Article Title</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {blogs.map(blog => (


                        <tbody key={blog.id}>
                            <tr>
                                {/* <td></td> */}
                                <Link className="Link" to={"/show/" + blog.id}>
                                    <td>{blog.Title}</td>
                                </Link>

                                <td>
                                    <span className='actions'>
                                        <Link className="Link" to={"/EditBlog/" + blog.id}> <BsPencilFill /></Link>
                                    </span>
                                </td>
                                <td>
                                    <span className='actions'>
                                        <BsTrashFill className="delete-btn" onClick={() => { DeleteBlog(blog.id) }} />
                                    </span>
                                </td>
                            </tr>

                        </tbody>
                    ))}

                </table>
            </div>
            




            <ToastContainer autoClose={1000} />





        </div>
    );
};

export default BlogslistView;