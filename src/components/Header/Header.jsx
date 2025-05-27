import ping from "../../assets/ping.svg";
import profilePhoto from "../../assets/profile_photo.svg";
import logo from "../../assets/logo.svg";
import icon from "../../assets/iconcha.svg";

const Header = ({ search, setSearch }) => {
  return (
    <div className="header flex items-center justify-between p-4 bg-white">
      <div className="header__logo flex items-center">
        <img src={logo} alt="Logo" />
        <div className="flex items-center border rounded px-2 bg-black py-1 space-x-2">
          <img src={icon} alt="Search icon" className="w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for any training you want"
            className="outline-none border-none w-[250px] text-white bg-black"
          />
        </div>
      </div>
      <div className="header__nav">
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <a href="/contact">
                <img src={ping} alt="Ping icon" />
              </a>
            </li>
            <li>
              <a href="/contact">
                <img src={profilePhoto} alt="Profile photo" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
