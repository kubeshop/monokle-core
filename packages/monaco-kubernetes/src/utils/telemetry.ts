import type {
  Telemetry,
  TelemetryEvent,
} from "yaml-language-server/lib/esm/languageserver/telemetry.js";

export function createTelemetry(
  { mock }: { mock: boolean } = { mock: false }
): Telemetry {
  if (mock) {
    return {
      send(): void {
        return;
      },
      sendError(): void {
        return;
      },
      sendTrack(): void {
        return;
      },
    } as unknown as Telemetry;
  }

  return {
    send(event: TelemetryEvent): void {
      console.log("[monaco-kubernetes] telemetry", event);
    },
    sendError(name: string, properties: unknown): void {
      console.log("[monaco-kubernetes] error", name, properties);
    },
    sendTrack(name: string, properties: unknown): void {
      console.log("[monaco-kubernetes] track", name, properties);
    },
  } as Telemetry;
}
