import { Vector3 } from "@minecraft/server";

export type BMCOptType = "movement" | "utilities";
export type DynamicPropertyType = Record<string, boolean | number | string | Vector3 | undefined>;