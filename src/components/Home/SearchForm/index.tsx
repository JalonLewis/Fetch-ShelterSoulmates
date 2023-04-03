import React from "react";
import {
  Button,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { SearchParams } from "../../../types";
import { Dispatch, SetStateAction } from "react";

// Define the props for the SearchForm component
interface SearchFormProps {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  breeds: string[];
  handleSearch: () => void;
  handleSortDirectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// The SearchForm component renders a form for users to input search parameters
export const SearchForm: React.FC<SearchFormProps> = ({
  searchParams,
  setSearchParams,
  breeds,
  handleSearch,
  handleSortDirectionChange,
}) => {
  // Handle input changes and update the searchParams state
  const handleInputChange = (
    event:
      | React.ChangeEvent<{ name?: string; value: unknown }>
      | SelectChangeEvent<string[]>
  ) => {
    const { name, value } = event.target;
    setSearchParams({ ...searchParams, [name as string]: value });
  };

  // Extract sort direction from searchParams
  const sortDirection = searchParams.sort.split(":")[1];

  // Render the search form with input fields and buttons for various search parameters
  return (
    <div>
      {/* Breed selection */}
      <div
        style={{
          display: "inline-block",
          width: "80%",
          marginRight: 10,
          marginBottom: 20,
        }}
      >
        <label htmlFor="breeds">Breeds</label>
        <select
          id="breeds"
          value={searchParams.breeds}
          name="breeds"
          onChange={handleInputChange}
          style={{ width: "100%", padding: "6px 12px" }}
        >
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
      {/* Sort direction selection */}
      <div style={{ display: "inline-block", width: 120}}>
        <label htmlFor="sortDirection">Sort</label>
        <select
          id="sortDirection"
          value={sortDirection}
          name="sortDirection"
          onChange={handleSortDirectionChange}
          style={{ width: "100%", padding: "6px 12px" }}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: 'space-between',
        }}
      >
        {/* ZIP Codes input */}
        <div style={{ width: "50%" }}>
          <label htmlFor="zipCodes">ZIP Codes</label>
          <input
            id="zipCodes"
            type="text"
            autoComplete="off"
            value={searchParams.zipCodes}
            name="zipCodes"
            onChange={handleInputChange}
            placeholder="Enter comma-separated ZIP codes"
            style={{ width: "100%", padding: "6px 12px" }}
          />
        </div>
        {/* Min age input */}
        <div style={{ width: "15%" }}>
          <label htmlFor="ageMin">Min Age</label>
          <input
            id="ageMin"
            type="number"
            value={searchParams.ageMin}
            name="ageMin"
            onChange={handleInputChange}
            style={{ width: "100%", padding: "6px 12px" }}
          />
        </div>
        {/* Max age input */}
        <div style={{ width: "15%" }}>
          <label htmlFor="ageMax">Max Age</label>
          <input
            id="ageMax"
            type="number"
            value={searchParams.ageMax}
            name="ageMax"
            onChange={handleInputChange}
            style={{ width: "100%", padding: "6px 12px" }}
          />
        </div>
        {/* Search button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginTop: 18, height: 30 }}
        >
          SEARCH
        </Button>
      </div>
    </div>
  );
};
