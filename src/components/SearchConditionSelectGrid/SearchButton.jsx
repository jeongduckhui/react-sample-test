// components/SearchButton.jsx
export default function SearchButton({ onSearch, loading }) {
  return (
    <button onClick={onSearch} disabled={loading}>
      조회
    </button>
  );
}
