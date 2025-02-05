import { HyperText } from "./hypertext";

export default function TriggerComponent() {
  return (
    <div className="text-4xl font-bold">
      <HyperText
        className="text-4xl font-bold text-black dark:text-white"
        text="AYUSH"
      />
      <HyperText
        className="text-4xl font-bold text-black dark:text-white"
        text="THAKUR!"
      />
    </div>
  );
}
