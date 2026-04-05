import { render } from "@testing-library/react";
import AboutPage from "../../pages/about";

describe("AboutPage", () => {
  it("renders the about page correctly", () => {
    const page = render(<AboutPage />);
    expect(page).toMatchSnapshot();
  });
});