
import React , {useState} from "react";
import { useParams} from 'react-router-dom';
import fb from "./firebase";
const DB =fb.firestore()
const Blogslist = DB.collection('Financeblogs');

const Financeblogpage = ()=> {
    const {id} = useParams();
    const[blogs, Setblogs] = useState([]);
    Blogslist.doc(id).get().then((snapshot) => {
        const data = snapshot.data()
        Setblogs(data);
    });
    const body = blogs.Body;
    return(
        <div>
            <p>Title : { blogs.Title}</p>
            <div className="blog">
                <div className="post">
                 
                <div  dangerouslySetInnerHTML={{__html: body}} />

                </div>
            </div>

            
        </div>
    );
};
export default Financeblogpage;