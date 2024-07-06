import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import localStorageManager from "../lib/LocalStorageManager";
import useCountriesAndStates from "./store/countries";

const useGetCountryDetails = () => {
  const { setAllCountries, setActiveCountry } = useCountriesAndStates();
  const token = localStorageManager.getItemWithExpiration("token");
  const { data, isLoading } = useQuery({
    queryKey: ["countries", "states"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/countrystatelist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllCountries(data);
      setActiveCountry(data[0].name, data);
      return data;
    },
  });
  return { data, isLoading };
};
export default useGetCountryDetails;
