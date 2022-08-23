import React, { useRef, useEffect } from "react";

function useOutsideClick(ref, action) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }
    document.addEventListener("mouseover", handleClickOutside);
    return () => {
      document.removeEventListener("mouseover", handleClickOutside);
    };
  }, [ref]);
}

function OutsideClick(props) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, props.action);

  return <div ref={wrapperRef}>{props.children}</div>;
}

export default OutsideClick;
