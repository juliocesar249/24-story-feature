import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { Story } from "./types";

export const storyAtomFamily = atomFamily((id: number) => atom<Story|null>(null));

export const listHeadAtom  = atom<number|null>(null);