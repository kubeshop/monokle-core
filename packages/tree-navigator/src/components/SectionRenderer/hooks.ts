import { useMemo } from "react";

import { SectionCustomization } from "../../types";

export function useSectionCustomization(customization: SectionCustomization = {}) {
  const customRow = useMemo(() => ({ Component: customization.row?.component }), [customization.row]);
  const customPrefix = useMemo(
    () => ({
      Component: customization.prefix?.component,
    }),
    [customization.prefix?.component]
  );
  const customSuffix = useMemo(
    () => ({
      Component: customization.suffix?.component,
    }),
    [customization.suffix]
  );
  const customContextMenu = useMemo(
    () => ({ Component: customization.contextMenu?.component }),
    [customization.contextMenu]
  );

  const customCounter = useMemo(() => ({ Component: customization.counter?.component }), [customization.counter]);

  return { customRow, customPrefix, customSuffix, customContextMenu, customCounter };
}
