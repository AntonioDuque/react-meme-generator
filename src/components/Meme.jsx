import { useState, useEffect } from "react";
import styles from "./Meme.module.css";
// import memesData from "../data/memesData";

const Meme = () => {


  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });


  const [allMemes, setAllMemes] = useState([]);

   /*
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

  useEffect(()=>{

    async function getMemes(){
      const res  = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes)
    }

    getMemes();

  },[])


  function getImageMeme() {
    
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;

    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: url,
      };
    });
  }


  function handleChange(event) {
    const { name, value } = event.target;

    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }


  return (
    <main>
      <div className={styles.formControl}>
        <input
          type="text"
          className={styles.formInput}
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          
        />
        <input
          type="text"
          className={styles.formInput}
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        
        <button className={styles.formButton} onClick={getImageMeme}>
          Get a new meme image 🤪
        </button>
      </div>

      <div className={styles.meme}>
        
        {meme.randomImage && (
          <img
            className={styles.randomImage}
            src={meme.randomImage}
            alt="random meme image"
          />
        )}

        <h2 className={`${styles.memeText}  ${styles.top}`}>{meme.topText}</h2>

        <h2 className={`${styles.memeText}  ${styles.botton}`}>{meme.bottomText}</h2>

      </div>
    </main>
  );
};

export default Meme;
