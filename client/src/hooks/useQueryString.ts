import qs from 'qs';
import { useLocation } from 'react-router-dom';

const useQueryString = () => {
  const { search } = useLocation();

  const getStringFromQuery = (query: any) =>
    qs.stringify(query, {
      arrayFormat: 'indices',
      indices: true,
      encode: false,
      skipNulls: true
    });

  const parseQuery = () =>
    qs.parse(search, {
      ignoreQueryPrefix: true
    });

  return {
    getStringFromQuery,
    parseQuery,
    search
  };
};

export default useQueryString;