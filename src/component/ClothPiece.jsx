const ClothPiece = ({
  id,
  length,
  width,
  liningRequired,
  laceRequired,
  sizeHandler,
  clothesLength,
}) => {
  return (
    <>
      <div className="form-control">
        <div className="label cursor-pointer">
          <span className="label-text">
            Size L X W <strong>(In)</strong>:
          </span>
          <div className="max-w-28 join">
            <input
              type="text"
              id={`l-${id}`}
              placeholder="Type the length"
              className="input input-bordered input-primary w-full max-w-16 join-item"
              value={length}
              name="length"
              onChange={(e) => sizeHandler(e, id)}
            />
            <input
              type="text"
              id={`w-${id}`}
              placeholder="Type the Width"
              className="input input-bordered input-primary w-full max-w-16 join-item"
              value={width}
              name="width"
              onChange={(e) => sizeHandler(e, id)}
            />
          </div>
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              checked={liningRequired}
              className="checkbox checkbox-primary"
              name="lining"
              onChange={(e) => sizeHandler(e, id)}
            />
            <span className="label-text">&nbsp;Lining</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              checked={laceRequired}
              className="checkbox checkbox-primary"
              name="lace"
              onChange={(e) => sizeHandler(e, id)}
            />
            <span className="label-text">&nbsp;Lace</span>
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 text-info hover:text-warning ${
              clothesLength <= 1 ? "disabled" : ""
            }`}
            onClick={
              clothesLength > 1 ? (e) => sizeHandler(e, id, true) : undefined
            }
            id={id}
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ClothPiece;
