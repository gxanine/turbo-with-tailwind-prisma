import { useMemo } from "react";

export function UserCard(props: {
  id: string | null;
  name: string | null;
  email: string | null;
}): JSX.Element {
  return (
    <div className="ui-border ui-rounded ui-px-3 ui-py-2 ui-max-w-xis ui-shadow-sm hover:ui-shadow-lg hover:ui-scale-[101%] ui-transition-all ui-text-sm ui-cursor-pointer ui-bg-white hover:ui-bg-white">
      <div className="ui-flex ui-gap-2">
        <div className="grid ui-place-content-center">
          <DummyImage name={props.name ?? "Anon Anon"} />
        </div>
        <div className="ui-flex-1">
          <div className="ui-flex ui-gap-2">
            <span>{props.name}</span>
            {props.email ? (
              <span className="ui-opacity-50">{`<${props.email}>`}</span>
            ) : null}
          </div>
          <div className="ui-text-xs ui-opacity-20">id:{props.id}</div>
        </div>
      </div>
    </div>
  );
}

function DummyImage({ name }: { name: string }): JSX.Element {
  const rand = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min) + min);
  const randColor = (): string =>
    `rgb(${rand(50, 100).toString()},${rand(50, 100).toString()},${rand(50, 200).toString()})`;

  const initials = name
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");

  const color = useMemo(randColor, []);

  return (
    <div
      className="ui-h-10 ui-w-10 ui-grid ui-place-content-center ui-rounded-full ui-text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
