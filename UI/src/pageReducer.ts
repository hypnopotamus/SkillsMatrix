import { createAction, createReducer } from "@reduxjs/toolkit";
import { IPage } from "./IPage";

export const pageRegistered = createAction<IPage>("pageRegistered");
export const pageSelected = createAction<IPage>("pageSelected");

export const pageReducer = createReducer<IPage[]>([], builder => {
    builder.addCase(pageRegistered, (state, action) => {
        state.push(action.payload)
    });
    builder.addCase(pageSelected, (state, action) => {
        state.forEach(p => p.selected = false);
        state.find(p => p.elementname === action.payload.elementname)!.selected = true;
    })
});