import { useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useTodoContext } from "../context/TodoContext";

export default function SearchTodoForm() {
  const { setFilterParams } = useTodoContext();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilterParams((prev) => ({
      ...prev,
      search,
      priority: priorityFilter,
      done:
        stateFilter === "all"
          ? undefined
          : stateFilter === "done"
          ? true
          : false,
      page: 0,
    }));
  };

  return (
    <form onSubmit={handleSearch}>
      <Grid container spacing={3}>
        <Grid size="grow">
          <TextField
            fullWidth
            label="Search tasks"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid size={2}>
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={2}>
          <FormControl fullWidth>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              id="state"
              value={stateFilter}
              label="State"
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="done">Done</MenuItem>
              <MenuItem value="undone">Undone</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          size={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ height: "56px" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
