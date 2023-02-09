export const Footer = () => {
  return (
    <footer className="w-11/12 text-xs">
      <h1 className="font-bold text-lg text-center border-b-2 py-2">Daily Auction</h1>

      <div className="flex justify-around items-baseline">
        <div className="flex flex-col">
          <div className="flex flex-col my-3 align-baseline">
            <div className="flex items-center mb-2">
              <img className="w-5 mr-1" src="https://img.icons8.com/ios-glyphs/60/null/github.png" alt="" />
              <p>Front-End</p>
            </div>
            <div className="flex gap-2">
              <a href="/">박혜정</a>
              <a href="/">정희찬</a>
              <a href="/">김재훈</a>
            </div>
          </div>
          <div className="flex flex-col my-3 align-baseline">
            <div className="flex items-center mb-2">
              <img className="w-5 mr-1" src="https://img.icons8.com/ios-glyphs/60/null/github.png" alt="" />
              <p>Back-End</p>
            </div>
            <div className="flex gap-2">
              <a href="/">강병재</a>
              <a href="/">조성웅</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div>
            <div className="flex items-center mr-1">
              <img className="w-4 mr-1" src="https://img.icons8.com/ios/50/null/info--v1.png" alt="" />
              <p>About us</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <a href="/">
              <img className="w-5" src="https://img.icons8.com/color/48/null/notion--v1.png" alt="" />
            </a>
            <a href="/">
              <img className="w-5" src="https://img.icons8.com/ios-glyphs/60/null/github.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
