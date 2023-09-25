import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import thunk from "redux-thunk";
import { within } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "./Login";

const mockStore = configureStore([thunk]);

describe("Login", () => {
  let store, Component;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          id: "sarahedo",
          name: "Sarah Edo",
        },
        mtsamis: {
          id: "mtsamis",
          name: "Mike Tsamis",
        },
        tylermcginnis: {
          id: "tylermcginnis",
          name: "Tyler McGinnis",
        },
        zoshikanlu: {
          id: "zoshikanlu",
          name: "Zenobia Oshikanlu",
        },
      },
    });
  });

  it("will match Snapshot", () => {
    Component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(Component).toMatchSnapshot();
  });

  it("should select a user from the dropdown", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    Component = getByTestId("Test Component");
    const dropdownOptions = within(Component).getAllByRole("option");
    const option = dropdownOptions[1];

    fireEvent.click(option);
    expect(option.getAttribute("aria-selected")).toBe("true");
  });
});
