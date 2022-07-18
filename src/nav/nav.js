import React from "react";

class NavBar extends React.Component {
  state = {
    navigation: [
      { name: "Introduction" },
      { name: "Routains" },
      { name: "Atoms" },
    ],

    current: "Introduction",
    loggedIn: true,
  };

  classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  movePage(name) {
    this.setState({ current: name });
    console.log(this.state.current);
  }

  componentDidMount() {}

  movePage(name) {
    if (name !== "Introduction") {
      if (this.state.loggedIn) {
        window.location.href = `/` + name.toLowerCase();
      } else {
        window.location.href = "/signin";
      }
    } else {
      window.location.href = `/`;
    }
  }

  render() {
    return (
      <div className="flex flex-wrap py-2">
        <div className="w-full px-4">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-zinc-900 rounded">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                <a
                  className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                  href="/"
                >
                  The Routainer
                </a>
                <button
                  className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                >
                  <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                  <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                  <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                </button>
              </div>
              <div
                className="flex lg:flex-grow items-center"
                id="example-navbar-info"
              >
                <ul className="flex flex-col lg:flex-row list-none ml-auto">
                  {this.state.navigation.map((value, index) => {
                    return (
                      <li className="nav-item" key={index}>
                        <a
                          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            this.movePage(value.name);
                          }}
                        >
                          {value.name}
                        </a>
                      </li>
                    );
                  })}
                  {/* <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/"
                    >
                      Introduction
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/routains"
                    >
                      Routain
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/atoms"
                    >
                      Atoms
                    </a>
                  </li> */}

                  <li className="nav-item">
                    <a
                      className="px-3 py-1 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/signin"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavBar;
