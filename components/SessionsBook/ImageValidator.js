function ImageWithValidation(props) {
    const { src, alt, className } = props;
    const [imgError, setImgError] = useState(false);
  
    function handleImgError() {
      setImgError(true);
    }
  
    return (
      <>
        {imgError ? (
          <span role="img" aria-label="error">
            😢
          </span>
        ) : (
          <img
            src={src}
            alt={alt}
            className={className}
            onError={handleImgError}
            style={{ border: "1px solid black", borderRadius: "5%" }}
          />
        )}
      </>
    );
  }
export default ImageWithValidation