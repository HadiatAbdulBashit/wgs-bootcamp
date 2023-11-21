function Navbar() {
  return (
  <nav class="navbar sticky-top shadow-sm bg-white">
    <div class="container">
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <span class="fs-4">Contact App</span>
      </a>

      <ul class="nav nav-underline">
        <li class="nav-item">
          <a href="/" class="nav-link" aria-current="page">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a href="/about" class="nav-link">
            About
          </a>
        </li>
        <li class="nav-item">
          <a href="/contact" class="nav-link">
            Contact
          </a>
        </li>
      </ul>
    </div>
  </nav>
  );
}

export default Navbar;
