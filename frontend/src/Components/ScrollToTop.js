import React, { useEffect, useState } from 'react';

//Icon
import { BiUpvote } from "react-icons/bi";

//Boostrap
import { Button } from 'react-bootstrap';
import '../Styles/scrollToTop.css'



function ScrollToTop() {

    const [isScrollBtnVisible, setIsScrollBtnVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsScrollBtnVisible(true);
        } else {
            setIsScrollBtnVisible(false);
        }
      };

      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };
    
      useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
      }, []);

    
    return (
        <div className="fixed-bottom scrollTopbtn">
        {isScrollBtnVisible && 
            <Button onClick={scrollToTop} id="topPage" variant="outline-dark" size="sm"><BiUpvote /></Button>

        }
        </div>
    )
}

export default ScrollToTop;
