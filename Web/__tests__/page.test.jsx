import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "../app/page"; // <-- change if your page.jsx is elsewhere

jest.mock("../app/components/PantryPanel", () => ({
  PantryPanel: ({ isOpen }) => <div data-testid="pantry">{String(isOpen)}</div>,
}));

jest.mock("../app/components/RecipeBrowser", () => ({
  RecipeBrowser: () => <div data-testid="browser">browser</div>,
}));

jest.mock("../app/components/RecipeCart", () => ({
  RecipeCart: ({ isOpen }) => <div data-testid="cart">{String(isOpen)}</div>,
}));

test("pantry toggles open/closed", async () => {
  const user = userEvent.setup();
  render(<Page />);

  expect(screen.getByTestId("pantry")).toHaveTextContent("true");

  await user.click(screen.getByRole("button", { name: /close pantry/i }));
  expect(screen.getByTestId("pantry")).toHaveTextContent("false");

  await user.click(screen.getByRole("button", { name: /open pantry/i }));
  expect(screen.getByTestId("pantry")).toHaveTextContent("true");
});

test("cart toggles open/closed", async () => {
  const user = userEvent.setup();
  render(<Page />);

  expect(screen.getByTestId("cart")).toHaveTextContent("true");

  await user.click(screen.getByRole("button", { name: /close cart/i }));
  expect(screen.getByTestId("cart")).toHaveTextContent("false");

  await user.click(screen.getByRole("button", { name: /open cart/i }));
  expect(screen.getByTestId("cart")).toHaveTextContent("true");
});

test('renders recipes after loading', async () => {
  render(<App />);

  // check that loading shows up
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // wait for the loading div to disappear
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
  // assert your recipes are there
  expect(screen.getByText(/beavgredients/i)).toBeInTheDocument();
});