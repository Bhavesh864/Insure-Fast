// RootNavigation.js
// https://reactnavigation.org/docs/navigating-without-navigation-prop/

import * as React from 'react';
import { DrawerActions, StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function push(...args) {
    navigationRef.current?.dispatch(StackActions.push(...args));
    // navigationRef.current?.dispatch(StackActions.push(...args));
}
export function popToTop(...args) {
    navigationRef.current?.dispatch(StackActions.popToTop(...args));
    // navigationRef.current?.dispatch(StackActions.push(...args));
}
export function pop(...args) {
    navigationRef.current?.dispatch(StackActions.pop(...args));
    // navigationRef.current?.dispatch(StackActions.push(...args));
}
export function navigate(...args) {
    navigationRef.current?.navigate(...args);
}
export function goBack(...args) {
    navigationRef.current?.goBack(...args);
}

export function openDrawer(...args) {
    navigationRef.current?.dispatch(DrawerActions.openDrawer());
}

export function closeDrawer(...args) {
    navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}



// add other navigation functions that you need and export them