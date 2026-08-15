import React, { useRef, useState } from "react";
import TaskList from "./TaskList";

function SearchBar() {
  const [query, setQuery] = useState("");
  // useRef points at the search input so we can read its value without storing it only in React state
  const searchInputRef = useRef(null);

  function handleSearch() {
    setQuery(searchInputRef.current.value);
  }

  return (
    <div>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search tasks..."
        onChange={handleSearch}
      />
      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;
