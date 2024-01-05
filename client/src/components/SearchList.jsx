/* eslint-disable react/prop-types */
import NoteCard from "./NoteCard";

const SearchList = ({ searchResults }) => {
  return (
    <>
      {searchResults && searchResults.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 ml-4">Search Results</h2>
          <div className="flex flex-wrap justify-evenly w-full">
            {searchResults.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </>
      ) : (
        "No matching search results found."
      )}
    </>
  );
};

export default SearchList;
