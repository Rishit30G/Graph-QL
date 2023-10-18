import React from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query UserList {
    users {
      id
      name
      username
      nationality
    }
  }
`;

const GET_MOVIES_BY_NAME = gql`
  query Movie($movieName2: String!) {
    movie(name: $movieName2) {
      name
      year
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = React.useState("");

  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [age, setAge] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const { loading, error, data, refetch } = useQuery(QUERY_ALL_USERS);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIES_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return (
    <>
      {/* <h1>{JSON.stringify(data)}</h1> */}
      <div>
        <input
          type="text"
          placeholder="Enter Name..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Age..."
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Enter Nationality..."
          onChange={(e) => setNationality(e.target.value)}
        />
        <button
          onClick={() => {
            createUser({ variables: {input: {name, username, age, nationality}} });
            refetch();
          }}
        >
          {" "}
          Create User{" "}
        </button>
      </div>
        <br />
        <h1 style={{color: "red"}}> New User List </h1>
        <br />
      <h1>
        {data.users.map((user) => (
          <div key={user.id}>
            <h3> Name of the user is: {user.name}</h3>
            <h3> Nationality of the user is: {user.nationality}</h3>
            <h3> Username of the user is: {user.username}</h3>
            <br />
          </div>
        ))}
        <div>
          <input
            type="text"
            placeholder="Enter Movie Name..."
            onChange={(e) => setMovieSearched(e.target.value)}
          />
          <button
            onClick={() =>
              fetchMovie({ variables: { movieName2: movieSearched } })
            }
          >
            Search Movie
          </button>
        </div>
        <div>
          {movieSearchedData && (
            <div>
              <h3> Name of the movie is: {movieSearchedData.movie.name}</h3>
              <h3> Year of the movie is: {movieSearchedData.movie.year}</h3>
            </div>
          )}
          {movieError && (
            <div>
              <h3> Error! {movieError.message}</h3>
            </div>
          )}
        </div>
      </h1>
    </>
  );
};

export default DisplayData;
