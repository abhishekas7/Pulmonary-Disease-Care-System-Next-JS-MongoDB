import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';


function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/doctor/regblog'); // Replace with your API endpoint
      setBlogPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header/>

      <section className="container mt-5">
        {blogPosts.map((blogPost) => (
          <div key={blogPost._id} className="ltn__blog-item ltn__blog-item-5">
            <div className="ltn__blog-brief">
              <div className="ltn__blog-meta">
                <ul>
                  <li className="ltn__blog-category">
                    <a href="#">{blogPost.category}</a>
                  </li>
                </ul>
              </div>

<div className="ltn__blog-meta">
  <ul>

    <li className="ltn__blog-date">
      <i className="far fa-calendar-alt" />{blogPost.date}
    </li>
  </ul>
</div>


              <h3 className="ltn__blog-title animated fadeIn">
                <a href="blog-details.html">{blogPost.title}</a>
              </h3>
              <p>{blogPost.description}</p>
              <div className="ltn__blog-meta-btn">
                <div className="ltn__blog-meta">
                  <ul>
                    <li className="ltn__blog-author">
                      <a href="#">
             
                        By: {blogPost.author}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Blog;
