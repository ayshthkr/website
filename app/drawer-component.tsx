import { Drawer } from "vaul";
import { useState } from "react";
import clsx from "clsx";
import TriggerComponent from "./trigger-component";
import TabsComponent from "./tabs-component";

const snapPoints = ["300px", 1];

export default function DrawerComponent() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Drawer.Root
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      snapToSequentialPoint
      shouldScaleBackground
      defaultOpen
      fadeFromIndex={1}
    >
      <Drawer.Trigger>
        <TriggerComponent />
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 z-50 bg-black/75" />
      <Drawer.Portal>
        <Drawer.Content
          data-testid="content"
          className="bg-white border-2 border-gray-300 border-b-none left-0 right-0 max-h-[97%] mx-[-1px] fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-[10px] bg-background"
        >
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
          <div
            className={clsx("flex flex-col max-w-7xl mx-auto w-full p-4 pt-5", {
              // "overflow-y-auto": snap === 1,
              "overflow-hidden": snap !== 1,
            })}
          >
            <Drawer.Title className="sr-only">asd</Drawer.Title>
            <TabsComponent />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
