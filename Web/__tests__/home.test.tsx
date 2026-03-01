// import { render, screen } from "@testing-library/react";
// import Page from "../app/page";

// test("renders page", () => {
//   render(<Page />);
//   expect(screen.getByTestId("page-root")).toBeInTheDocument();
// });
import { render, screen, waitFor } from "@testing-library/react";
import Page from "../app/page";
import '@testing-library/jest-dom'; 

// 1. Mock the fetch globally before tests run
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: "Test Recipe", image: "" }]),
  })
) as jest.Mock;

test("renders page after loading", async () => {
  render(<Page />);

  // 2. Use 'waitFor' to handle the 'act' and the async transition
  // This waits for 'Loading...' to disappear and 'page-root' to appear
  await waitFor(() => {
    expect(screen.getByTestId("page-root")).toBeInTheDocument();
  });

  expect(screen.getByText("Beavgredients")).toBeInTheDocument();
});
