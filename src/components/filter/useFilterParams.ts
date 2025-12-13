import { useSearchParams } from 'react-router';

const useFilterParams = () => {
  const [params] = useSearchParams();

  const filters: Record<string, string> = {};
  params.forEach((value, key) => {
    filters[key] = value;
  });

  return filters;
};

export default useFilterParams;
