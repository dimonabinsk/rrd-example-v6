import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>User App</h1>
      <BrowserRouter>
        <NavLink to="/users">Users List Page</NavLink>
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="users" element={<UsersLayout />}>
            <Route index element={<UsersListPage />} />
            <Route path=":userId" element={<Outlet />}>
              <Route path="profile" element={<UserProfilePage />} />
              <Route path="edit" element={<EditUserPage />} />
              <Route index element={<Navigate to="./profile" />} />
              <Route path="*" element={<Navigate to="../profile" />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function MainPage() {
  return (
    <>
      <h2>MainPage</h2>
    </>
  );
}

function UsersLayout() {
  return (
    <div>
      <h2>Users Layout</h2>
      <NavLink to="/">Main Page</NavLink>
      <Outlet />
    </div>
  );
}

function UsersListPage() {
  return (
    <div>
      <h3>User Page</h3>
      <ul>
        {new Array(5).fill("").map((_, i) => (
          <li key={"user_list" + i}>
            <NavLink to={i + 1 + "/profile"}>User {i + 1}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserProfilePage() {
  const { userId } = useParams();
  return (
    <div>
      <h2>User Page</h2>
      <ul>
        <li>
          <NavLink to="/users">Users List page</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${userId}/edit`}>Edit this user</NavLink>
        </li>
      </ul>
      <p>user ID: {userId}</p>
    </div>
  );
}

function EditUserPage() {
  const { userId } = useParams();
  return (
    <div>
      <h2> Edit User Page</h2>
      <ul>
        <li>
          <NavLink to={"/users/" + userId}>User profile Page</NavLink>
        </li>
        <li>
          <NavLink to={"/users/" + (+userId + 1)}> Another User</NavLink>
        </li>
        <li>
          <NavLink to={"/users"}> Users List page</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default App;
