import React, { useEffect, useState } from "react";
import { Container, SelectChangeEvent, Typography } from "@mui/material";
import DogList from "./DogList";
import Pagination from "./Pagination";
import { SearchForm } from "./SearchForm";
import { LogoutButton } from "./LogoutButton";
import api from "../../api";
import { Dog, SearchParams } from "../../types";

// The Home component is the main page for searching and displaying dogs
const Home: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]); // State variable to hold the list of dogs fetched from the API
  const [breeds, setBreeds] = useState<string[]>([]); // State variable to hold the list of dog breeds fetched from the API
  const [searchSize, setSearchSize] = useState<number>(25); // State variable to hold the number of dogs to be displayed per page
  const [sortDirection, setSortDirection] = useState("asc"); // State variable to hold the current sort direction for the search results
  const [searchParams, setSearchParams] = useState<SearchParams>({
    // State variable to hold the current search parameters
    breeds: [],
    zipCodes: [],
    ageMin: "",
    ageMax: "",
    size: 25,
    from: 0,
    sort: "breed:asc",
  });
  const [pageNumber, setPageNumber] = useState(1); // State variable to hold the current page number
  const [totalResults, setTotalResults] = useState(0); // State variable to hold the total number of search results

  // Perform the initial search when the component mounts
  useEffect(() => {
    handleSearch();
  }, []);

  // Search for dogs based on the current search parameters and update the state
  const handleSearch = async () => {
    setPageNumber(1); // Reset the page number when a new search is performed
    try {
      const filteredSearchParams = Object.fromEntries(
        Object.entries(searchParams).filter(
          ([key, value]) =>
            value !== "" && !(Array.isArray(value) && value.length === 0)
        )
      );

      const response = await api.get("/dogs/search", {
        params: filteredSearchParams,
      });

      const totalResults = response.data.total;
      setTotalResults(totalResults);

      const dogIds = response.data.resultIds;
      const dogResponse = await api.post("/dogs", dogIds);
      setDogs(dogResponse.data);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  // Fetch a page of dogs based on the current search parameters and page number
  const fetchDogs = async (
    pageNumber: number,
    updatedSearchParams?: typeof searchParams
  ) => {
    try {
      const paramsToUse = updatedSearchParams || searchParams;
      const filteredSearchParams = Object.fromEntries(
        Object.entries(paramsToUse).filter(
          ([key, value]) =>
            value !== "" && !(Array.isArray(value) && value.length === 0)
        )
      );

      const from = (pageNumber - 1) * searchSize; // Calculate the value of the "from" parameter based on the page number

      // Make a GET request to the "/dogs/search" endpoint with the filtered search parameters, search size, and from value
      const response = await api.get("/dogs/search", {
        params: { ...filteredSearchParams, searchSize, from },
      });

      // Extract the resultIds from the response data
      const dogIds = response.data.resultIds;

      // Make a POST request to the "/dogs" endpoint with the resultIds to fetch the full dog data
      const dogResponse = await api.post("/dogs", dogIds);

      // Update the dogs state variable with the data from the dogResponse
      setDogs(dogResponse.data);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  // Define a function to fetch the list of dog breeds from the API
  const fetchBreeds = async () => {
    try {
      // Make a GET request to the "/dogs/breeds" endpoint to get the list of dog breeds
      const response = await api.get("/dogs/breeds");

      // Update the breeds state variable with the data from the response
      setBreeds(response.data);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  // Call the fetchBreeds function when the component mounts using useEffect
  useEffect(() => {
    fetchBreeds();
  }, []);

  // Update the sort direction when it is changed by the user
  const handleSortDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSortDirection = event.target.value;
    setSortDirection(newSortDirection);
    const updatedSearchParams = {
      ...searchParams,
      sort: `breed:${newSortDirection}`,
    };
    setSearchParams(updatedSearchParams);
    fetchDogs(pageNumber, updatedSearchParams); // Call fetchDogs with the updated searchParams
  };

  // Update the number of dogs displayed per page when it is changed by the user
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    const updatedSearchParams = { ...searchParams, size: newSize, from: 0 };
    setSearchParams(updatedSearchParams);
    setPageNumber(1);
    setSearchSize(newSize); // Set the new search size in the state
    fetchDogs(1, updatedSearchParams); // Call the fetchDogs function to update the dogs state with the new number of dogs per page
  };

  // Render the Home component, including the search form, dog list, and pagination controls
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#519872",
        alignItems: "center",
        minWidth: "100%",
        margin: -8,
      }}
    >
      <div>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          style={{
            color: "white",
            backgroundColor: "#1976d2",
            padding: 10,
            borderRadius: 4,
            marginTop: 10,
          }}
        >
          Fetch invites you to open your heart and home to a shelter dog in
          need!
        </Typography>
        <SearchForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          breeds={breeds}
          handleSearch={handleSearch}
          handleSortDirectionChange={handleSortDirectionChange}
        />
      </div>
      <DogList dogs={dogs} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination
          pageNumber={pageNumber}
          totalResults={totalResults}
          searchSize={searchParams.size}
          onPageChange={(newPageNumber) => {
            fetchDogs(newPageNumber);
            setPageNumber(newPageNumber);
          }}
        />
        <div
          style={{
            width: 160,
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: 4,
            marginLeft: 10,
          }}
        >
          <select
            id="size"
            value={searchParams.size.toString()}
            name="size"
            onChange={handleSizeChange}
            style={{ width: "100%", padding: "6px 12px" }}
          >
            <option value={10}>10 Dogs per page</option>
            <option value={25}>25 Dogs per page</option>
            <option value={50}>50 Dogs per page</option>
            <option value={100}>100 Dogs per page</option>
          </select>
        </div>
        <LogoutButton />
      </div>
    </Container>
  );
};

export default Home;
