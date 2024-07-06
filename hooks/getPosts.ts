import axios from "axios";
import qs from "query-string"
import {ProductResponse } from "@/type";
import { useState } from "react";



interface Query {
  page: number;
  isFeatured?: boolean;
  'category[name]'?: string;
}

const getPosts=async(query:Query)=>{
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/product/${process.env.NEXT_PUBLIC_STORE_ID}/filter`;
  const url = qs.stringifyUrl({
      url: baseUrl,
      query: {
        page: query.page, 
      },
    });
      const {data} = await axios.get(`${url}`);
      

      return data as ProductResponse;
}

  export default getPosts;