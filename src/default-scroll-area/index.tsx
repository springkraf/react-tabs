import { ScrollArea } from '@mantine/core';
import type { PropsWithChildren } from 'react';

import './style.css';

export default function DefaultScrollArea(props: PropsWithChildren) {
  return (
    <ScrollArea
      type="auto"
      className="default-scrollarea-container"
      scrollbarSize={8}
    >
      {props.children}
    </ScrollArea>
  );
}
