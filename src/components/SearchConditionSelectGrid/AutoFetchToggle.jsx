// components/AutoFetchToggle.jsx
export default function AutoFetchToggle({ autoFetch, setAutoFetch }) {
  return (
    <label style={{ marginLeft: 10 }}>
      <input
        type="checkbox"
        checked={autoFetch}
        onChange={e => setAutoFetch(e.target.checked)}
      />
      자동조회
    </label>
  );
}
