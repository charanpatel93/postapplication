import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstref = useRef();
  let lastref = useRef();
  let emailref = useRef();
  let passwordref = useRef();
  let phoneref = useRef();
  let profileref = useRef();
  let [element, setelement] = useState(
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAnAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QALxAAAgIBAwIFAwIHAQAAAAAAAAECAxEEITESURMiMkFhcaGxUoEzNENigpHBBf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAABW1GoVeYxWZfgCayyFazN4KVuslL0eWP3K85SnLMnl9zkD2UnLdtv6s8AAAAAAABLXfZX6ZfsyIAaNOrhPyz8svsWEYxY0+plW0peaP4A0gcwkpx6ovKOgAAAAEOot8KGdnL2QHGq1Hhrpj639jPbbe7yJSc223lv3PAAAAAFjTaZ2eae0Pb5ArnaqsfFcv9GnXVCteWKR3gDIlCUfVFr6o5NlpNYZXu0kJ5cV0y+wGcDqcZQk4zWGjkAAAJtPe6pd4vlGlGSkk1wzHLOku6JdEn5X9mBog8PQPG8IzNTZ4tmfZcFzV2Oul45exmgAAAAAE2lp8Wzf0rdmmklwivoYYpUlzLcsgAAAAAFfV0+JDKXmW6M3g2WZeph0Xziu+QIgAAAAGlo7fErw/UiwZelscLV87Gk1kCjr55sUfZL8lUk1D6tRN/JGAAAALlAAaum/l68fpJStop5oS/TsWQAAAAAAZ2v/jvHOEaLMrUy6r5P5wBEAAAAAfQ1qpqdcZd0ZL4NDQyzRjs2gKEn1Sb+cng7gAAAAAAn0tvhWbvyvk0zFNHR+Ko4mvL7Z5AsgAAAeSzh9PIEOqt8KvZ+Z8GYS6hWdebVuRAAAAAAAlps6Yv2y8kR1FOSygFqxbJdmzkm1kcahvvuQgAAAOoRc5KMVls5SbaS5Zp6WlVR39T5A80+mjUsyWZ9+xPg9AAAAAABzKEZRcZJNfJn6nTOrzQ3h+DSPGk+QMYE+qp8KWY+l8fBAAAAAt6Srrrbf6ipyaekXTRHbncCL/0IZjGfutiia9kOutx7oyZRcZOL5QHgB1CLnOMVy3gC1oaVnxH9EXUeQgoRUVwlhHQAAAAAAAAAAAcWQVkHGXuZU4dE3F8rY2Clr6uLF9GBSAAHVceuSj3eDXWyx2KOgrzJ2NbLZF5rIHpS11P9RfuXTxxTWMAYxa0EM2Sm+EiPU0eFLb0PguaKPTQn7t5AsAAAAAAAAAAAAABxbHrrlHujsMDFxjk6rg7JqK5ZJqYY1Ekvd7FzS0KuOWvM+QJa4KuCivY7AAAADmcFOLjJZTK8ZPTNQnvXnyy7Fo8lFSTTxhgMprOT0rOuyp5p3j7wf8Aw7q1EJvp9Mv0sCYHh6AAAAAAADmU1BZk0kB7lEd1yrS95PiKI3bO7aiP+bJKqVB9T3m+ZMDmmp9Tst3m/sTgAAAAAAAAAeYOLaoWLzxTAApTtnRb0Qk3HtLcvVTc45eP2PABIeZAAI9AAparU2Q2jhfODuiqNsVO3M3/AHHgAtYXsegAAAAAAH//2Q=="
  );

  let sendingdata = async () => {
    let dataaa = new FormData();
    dataaa.append("email", emailref.current.value);
    dataaa.append("password", passwordref.current.value);
    dataaa.append("firstname", firstref.current.value);
    dataaa.append("lastname", lastref.current.value);
    dataaa.append("phoneNo", phoneref.current.value);

    for (let i = 0; i < profileref.current.files.length; i++) {
      dataaa.append("profile", profileref.current.files[i]);
    }
    let reqOption = {
      method: "post",
      body: dataaa,
    };
    let JSONData = await fetch("/Signup", reqOption);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
  };
  return (
    <div>
      <form>
        <div>
          <label>firstname:</label>
          <input ref={firstref}></input>
        </div>
        <div>
          <label>lastname:</label>
          <input ref={lastref}></input>
        </div>
        <div>
          <label>email:</label>
          <input ref={emailref}></input>
        </div>
        <div>
          <label>password:</label>
          <input ref={passwordref}></input>
        </div>
        <div>
          <label>phoneNo:</label>
          <input ref={phoneref}></input>
        </div>
        <div>
          <label>profile:</label>
          <input
            type="file"
            ref={profileref}
            onChange={(e) => {
              let photos = URL.createObjectURL(e.target.files[0]);
              setelement(photos);
            }}
          ></input>
        </div>
        <div>
          <img src={element} className="profilephoto" alt="Profile" />
        </div>
        <div>
          <button type="button" onClick={() => [sendingdata()]}>
            submit
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to="/">Already have an account? Login</Link>
    </div>
  );
}

export default Signup;
