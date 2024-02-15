import React , {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import fb from "./firebase";
import { Editor } from '@tinymce/tinymce-react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const DB =fb.firestore()
const Blogslist = DB.collection('Careerblogs');

const CareerblogEdit = () => {
    const { id } = useParams();

    const [title, SetTitle] = useState("");
	const [body, SetBody] = useState("");

    useEffect( ()=> {
        Blogslist.doc(id).get().then((snapshot) => {
            const data = snapshot.data();
            SetTitle(data.Title);
            SetBody(data.Body);
        });
    },[]);
        
    const submit =(e)=> {
        e.preventDefault();
        Blogslist.doc(id).update({
            Title: title,
            Body: body
        })
        .then((docRef)=> {
            // alert("data successfully submit")
            toast.success("Article Updated!", {
                position: toast.POSITION.TOP_CENTER,
                icon: "🚀"
              });
        })
        .catch((error) => {
            console.error("error:", error);
        });
    }
    return(
        <div className="container" >
            
            <form onSubmit={(event) => {submit(event)}}>    
            {/* <input type="text" placeholder="Title" value={title}
            onChange={(e)=>{SetTitle(e.target.value)}} required />

            <textarea  name="content" type="text" value={body} 
            placeholder="write yoyr content here" 
            rows="10" cols="150" onChange={(e)=>{SetBody(e.target.value)}} required >
            </textarea>

            <button type="submit">Submit</button> */}

            <input className='title' type="text" placeholder="Title" value={title}
                    onChange={(e) => { SetTitle(e.target.value) }} required />
                <Editor
                    value={body}
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
        <ToastContainer autoClose={1000}/>
        </div>
    );
};
export default CareerblogEdit;


