import { useState, useEffect, useContext } from "react";
import React from "react";
import useGraphQL from "../common/gql";

export interface Layer {
  id: number;
  title: string;
  description?: string;
  image?: string;
}

export interface Category {
  id: number;
  title: string;
  description?: string;
  image?: string;
}

export interface AppData {
  // What properties does your context provide?
  layers: Layer[];
  categories: Category[];
}

const defaultValues: AppData = {
  // Default values go here
  layers: [],
  categories: [],
};

export const AppDataContext = React.createContext(defaultValues);

export function useAppData() {
  return useContext(AppDataContext);
}

export function useLayers() {
  let { layers } = useAppData();
  return layers || [];
}

export function useCategories() {
  let { categories } = useAppData();
  return categories || [];
}

function useAppDataData() {
  let [{ data, errors }] = useGraphQL(QUERY);

  // Here is where you should do things that will update state
  // - Async API request? Listening for Events? Other?
  // Whenever the thing you care about happens, call `setData`
  // and then all the components that use your context will be updated
  return {
    ...(data || {}),
    errors,
  };
}

export function AppDataProvider({ children }) {
  let data = useAppDataData();
  return <AppDataContext.Provider value={data}>{children}</AppDataContext.Provider>;
}

const QUERY = `query GetAppData {
  categories(order_by: {position: asc}) {
    id
    title
    description
    image
  }
  layers(order_by: {position: asc}) {
    id
    title
    description
    image
  }
}
`;
// Wrap Your app with the Provider
// <AppDataProvider>
//    <RestOfApp/>
// </AppDataProvider>

// // Use the normal hook anywhere in your app (assuming you've wrapped it in a provider)
// function ChildComponent() {
//   let data = useAppData();
//   return <div>{JSON.stringify(data, null, 2)}</div>;
// }
