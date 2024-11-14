"use client";
import { useEffect, useState } from "react";
import { type User } from "@repo/database";
import { getUsers } from "#actions/users";
import { Button } from "#atoms/button";
import { UserCard } from "./user-card";

export function UserList(): JSX.Element {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>();

  function clickHandler(): void {
    setLoading(true);
    void getUsers().then((user) => {
      setLastRefreshed(new Date());
      setLoading(false);
      setData(user);
    });
  }

  useEffect(() => {
    clickHandler();
  }, []);

  const formattedRefreshed =
    lastRefreshed?.toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "medium",
    }) ?? "never";
  return (
    <div className="ui-grid ui-gap-2 ui-w-full">
      <div className="ui-flex ui-place-content-center">
        <div className="ui-grid ui-gap-2 ui-text-center">
          <div>
            <Button loading={loading} onClick={clickHandler}>
              Refresh
            </Button>
          </div>
          {lastRefreshed ? (
            <div className="ui-text-xs ui-opacity-30 ui-font-mono">
              <span>{`Last refreshed: ${formattedRefreshed}`}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div
        aria-disabled={loading}
        className="ui-grid md:ui-grid-cols-2 xl:ui-grid-cols-3 ui-gap-2 ui-px-2 ui-place-conctent-center ui-max-w-lg md:ui-max-w-3xl xl:ui-max-w-6xl ui-mx-auto ui-w-full"
      >
        {data.map((el) => (
          <UserCard key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
}
