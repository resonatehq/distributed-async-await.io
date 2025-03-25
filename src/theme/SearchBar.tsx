// By default, the classic theme does not provide any SearchBar implementation
// If you swizzled this, it is your responsibility to provide an implementation
// Tip: swizzle the SearchBar from the Algolia theme for inspiration:
// npm run swizzle @docusaurus/theme-search-algolia SearchBar

import './SearchBar.css';

const SearchBar = ({ handleSearch }) => {
    
    return (
        <button
            aria-label="Search"
            className="navbar__search-input search-echo"
        >
            &#x2318; K
        </button>
    );
  };

export default SearchBar;
