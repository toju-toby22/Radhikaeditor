import logo from './logo.svg';
import './App.css';
import React from "react";
import CreateBlog from "./create";
import BlogslistView from "./blogslist";
import BlogView from "./show";
// import Financeblogpage from "./Financeblogpage";
import BlogEdit from "./edit";
import { Router, Routes, Route } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FinanceArticles from './FinanceArticles';
import CareerArticleeditor from './CareerArticleeditor';
import { Link } from 'react-router-dom';
import Financeblogpage from './Financeblogpage.';
import Financeedit from './Financeedit';
import CareerblogEdit from './CareerblogEdit';
import CareerblogPage from './CareerblogPage';


function App() {
  return (
    <div className="App">

<div className="navbar">
    <div className="logo">
    <Link className='link' to = "/">
        <h2>
        Radhika
        </h2>
        </Link>
    </div>


    <ul className="pagelinks">
        <Link className='link' to = "/FinanceArticles"><li>Finance & Real Estate</li></Link>
        <Link className='link' to = "/CareerArticleeditor"><li>Career</li></Link>
        <Link className='link' to = "/"><li>Personal Development</li></Link>
        
    </ul>
</div>

      <Routes>
        <Route path="/" element={<CreateBlog />} />
        <Route exact path="/bloglistview" element={<BlogslistView />} />
        <Route path="/show/:id" element={<BlogView />} />Financeblogpage
        <Route path="/Financeblogpage/:id" element={<Financeblogpage />} />
        <Route path="/EditBlog/:id" element={<BlogEdit />} />
        <Route path="/Financeedit/:id" element={<Financeedit />} />
        <Route path="FinanceArticles" element={<FinanceArticles/>}/>
        <Route path="CareerArticleeditor" element={<CareerArticleeditor/>}/>
        <Route path="/CareerblogEdit/:id" element={<CareerblogEdit />} />
        <Route path="/CareerblogPage/:id" element={<CareerblogPage />} />

      </Routes>

      {/* <Editor
        apiKey='8hbelft3ue0whbpv61565wc68y1oep6xek0pny3w1hppridm'
        init={{
          plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        initialValue="Welcome to TinyMCE!"
      /> */}
    </div>
  );
}

export default App;
