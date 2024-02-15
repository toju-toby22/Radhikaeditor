import { Editor } from '@tinymce/tinymce-react';
import react, { useState, useEffect } from 'react';
import fb from './firebase';
import BlogslistView from './blogslist';
import Table from './Table';
import 'react-toastify/dist/ReactToastify.css';
import { BsTrashFill, BsPencilFill } from "react-icons/bs"
import './index.css';
// import { toast } from "react-toastify";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';


const db = fb.firestore()
const Careerblogs = db.collection('Careerblogs');
const Careerblogsedit = db.collection('Careerblogs');

const CareerArticleeditor = () => {


    const [title, SetTitle] = useState("");
    const [description, SetDescription] = useState("");
    const [body, SetBody] = useState("");
    const [blogs, Setblogs] = useState([]);

    const sub = (e) => {
        e.preventDefault();
        // Add data to the store
        Careerblogs.add({
            Title: title,
            Body: body,
            Desc: description,
            publish: false,
            published_on: fb.firestore.Timestamp.fromDate(new Date())
        })
            .then((docRef) => {
                // alert("Data Successfully Submitted");
                toast.success("Article Successfully Submitted!", {
                    position: toast.POSITION.TOP_CENTER,
                    icon: "🚀"
                });
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                toast.error("Error", {
                    position: toast.POSITION.TOP_CENTER,
                    icon: "🚀"
                });
            });
    };





    // Blog table

    useEffect(() => {
        const unsubscribe = Careerblogsedit.limit(100).onSnapshot(querySnapshot => {
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
        Careerblogsedit.doc(id).delete().then(() => {
            // alert("Document successfully deleted!");
            toast.info("Article successfully deleted!", {
                position: toast.POSITION.TOP_CENTER,
            });
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };



    return (
        <div className='container'>


    
            <div>

                <h1>
                Career Article Editor
                </h1>
            </div>
            <form onSubmit={(event) => { sub(event) }}>
                <input className='title' type="text" placeholder="Title"
                    onChange={(e) => { SetTitle(e.target.value) }} required />

                <input className='title' type="text" placeholder="Desc"
                    onChange={(e) => { SetDescription(e.target.value) }}/>


                <Editor 
                    apiKey='8hbelft3ue0whbpv61565wc68y1oep6xek0pny3w1hppridm'
                    textareaName='description'
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount', 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | blocks fontfamily fontsize | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(newText) => SetBody(newText)}
                />
                <button type="submit">Submit</button>
            </form>











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
                                <Link className="Link" to={"/CareerblogPage/" + blog.id}>
                                    <td>{blog.Title}</td>
                                {/* <td>{blog.Desc}</td> */}

                                </Link>


                                <td>
                                    <span className='actions'>
                                        <Link className="Link" to={"/CareerblogEdit/" + blog.id}> <BsPencilFill /></Link>
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
}

export default CareerArticleeditor