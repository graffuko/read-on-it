export default function Book({ bookObj }) {
    const {
      reference,
      text,
      translation_id,
      translation_name,
      cover_id, 
    } = bookObj;
  
    const coverUrl = cover_id
      ? `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`
      : 'https://covers.openlibrary.org/b/olid/OL7440033M-M.jpg'; // Fallback cover
  
    return (
      <div>
        <img src={coverUrl} alt={`Cover of ${reference}`} />
        <h2>{reference}</h2>
        <p>{text}</p>
        <p>Translation: {translation_name} ({translation_id})</p>
      </div>
    );
  }