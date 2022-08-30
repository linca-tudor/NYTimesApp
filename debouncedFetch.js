import React, { useRef } from "react";
import { debounce } from "lodash";

const debouncedFetch = () => {
  debounce(async () => {
    const resp = await fetch(
      "https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=DWBqhRsvR2qyt8O3T6PlvsOl2lqO0hTu"
    );
  }, 6000);
};

export default debouncedFetch;
