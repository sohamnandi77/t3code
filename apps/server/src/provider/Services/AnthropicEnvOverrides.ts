import { Effect, Layer, Ref, ServiceMap } from "effect";
import type { AnthropicSetEnvResult } from "@t3tools/contracts";

export interface AnthropicEnvOverridesState {
  readonly anthropicBaseUrl: string | null;
  readonly anthropicAuthToken: string | null;
}

export interface AnthropicEnvOverridesShape {
  readonly get: Effect.Effect<AnthropicEnvOverridesState>;
  readonly set: (
    input: Readonly<AnthropicEnvOverridesState>,
  ) => Effect.Effect<AnthropicSetEnvResult>;
}

export class AnthropicEnvOverrides extends ServiceMap.Service<
  AnthropicEnvOverrides,
  AnthropicEnvOverridesShape
>()("t3/provider/Services/AnthropicEnvOverrides") {}

export const AnthropicEnvOverridesLive = Layer.effect(
  AnthropicEnvOverrides,
  Effect.gen(function* () {
    const ref = yield* Ref.make<AnthropicEnvOverridesState>({
      anthropicBaseUrl: null,
      anthropicAuthToken: null,
    });

    const get: AnthropicEnvOverridesShape["get"] = Ref.get(ref);
    const set: AnthropicEnvOverridesShape["set"] = (input) =>
      Ref.set(ref, {
        anthropicBaseUrl: input.anthropicBaseUrl,
        anthropicAuthToken: input.anthropicAuthToken,
      }).pipe(
        Effect.as({
          anthropicAuthTokenSet: Boolean(
            input.anthropicAuthToken && input.anthropicAuthToken.trim().length > 0,
          ),
          anthropicBaseUrl: input.anthropicBaseUrl,
        }),
      );

    return { get, set } satisfies AnthropicEnvOverridesShape;
  }),
);
