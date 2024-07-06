import { Country } from "@/type";
import { create } from "zustand";

interface CountriesState {
  allCountries: Country[];
  setAllCountries: (newCountries: Country[]) => void;
  activeCountry: Country | null;
  setActiveCountry: (country: string, allCountries: Country[]) => void;
}

const useCountriesAndStates = create<CountriesState>((set) => ({
  allCountries: [],
  setAllCountries: (newCountries: Country[]) => {
    set({ allCountries: newCountries });
  },
  activeCountry: null,
  setActiveCountry: (country: string, allCountries: Country[]) => {
    const newCountry = allCountries.find((each) => each.name === country);
    set({ activeCountry: newCountry || null });
  },
}));

export default useCountriesAndStates;
