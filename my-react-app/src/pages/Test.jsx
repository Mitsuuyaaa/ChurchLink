import React, { useEffect, useState } from 'react'


function Test() {
  const [keyword, setKeyword] = useState("");
  const [posts, setPosts] = useState([]);

  function onKeywordChange(event) {
    setKeyword(event.target.value)
  }


  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
  }, []);

  return (
    <div>TestPage
      <input type="text"
        value={keyword}
        onChange={onKeywordChange}
      />
      <div>
      {
        posts.map((post) => (<div key={post.id}> <h1 className="text-red-500"> {post.title} </h1> <p>{post.body}</p> </div>) )
      }
      <h1 className='bg-primary text-accent'></h1>
      </div>
    </div>
  )
}

export default Test
//rafce