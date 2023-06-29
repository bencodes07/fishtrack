function HomeOut() {
  return (
    <>
      <nav className="flex justify-between w-screen h-[140px]">
        <div>
          <h1 className="font-logo">fishtrack.</h1>
        </div>
        <div>
          <ul className="flex">
            <li><a href="#">HOME</a></li>
            <li><a href="#">FRIENDS</a></li>
            <li><a href="#">INVITE</a></li>
          </ul>
        </div>
        <div>
          <button>LOGIN</button>
        </div>
      </nav>

    </>
  );
}

export default HomeOut;
