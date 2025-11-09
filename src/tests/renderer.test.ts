import { describe, expect, test } from "bun:test";
import { renderComponent } from "../renderer";

describe("renderComponent", () => {
  test("should render nested section with text and inline link", () => {
    const component = {
      type: "section",
      props: {
        textAlign: "center",
      },
      children: [
        {
          type: "text",
          props: {
            children: [
              "How about evaluating a previous purchase? ",
              {
                type: "link",
                props: {
                  href: "#",
                  children: "View more",
                  color: "#ffffff",
                  textDecoration: "underline",
                },
              },
            ],
            backgroundColor: "#008296",
            color: "#ffffff",
            padding: "8px 0",
          },
        },
      ],
    };

    const html = renderComponent(component);
    expect(html).toMatchSnapshot();
  });
});
