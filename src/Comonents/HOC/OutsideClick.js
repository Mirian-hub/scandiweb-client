import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(ref, action) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    debugger
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action()
      }
    }
    // Bind the event listener
    document.addEventListener("mouseover", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseover", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideClick(props) {
  debugger
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, props.action);

  return <div ref={wrapperRef}>{props.children}</div>;
}


export default OutsideClick;
