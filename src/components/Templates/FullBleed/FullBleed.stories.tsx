import { Article } from "@/components/Templates";

import { FullBleed } from "./FullBleed";

import type { Meta } from "@storybook/react/types-6-0";

export default {
  title: "Templates/FullBleed",
  component: FullBleed,
} as Meta;

export const Standard = () => (
  <Article>
    <h1>Stack Example</h1>
    <div>Item 1</div>
    <FullBleed style={{ background: "deeppink", height: "25vh" }} />
    <button className="stack-skip">Skip Stack</button>
    <div>Item 4</div>
  </Article>
);
