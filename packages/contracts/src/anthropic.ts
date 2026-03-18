import { Schema } from "effect";
import { TrimmedNonEmptyString } from "./baseSchemas";

export const AnthropicSetEnvInput = Schema.Struct({
  anthropicBaseUrl: Schema.NullOr(TrimmedNonEmptyString),
  anthropicAuthToken: Schema.NullOr(TrimmedNonEmptyString),
});
export type AnthropicSetEnvInput = typeof AnthropicSetEnvInput.Type;

export const AnthropicSetEnvResult = Schema.Struct({
  anthropicAuthTokenSet: Schema.Boolean,
  anthropicBaseUrl: Schema.NullOr(TrimmedNonEmptyString),
});
export type AnthropicSetEnvResult = typeof AnthropicSetEnvResult.Type;
