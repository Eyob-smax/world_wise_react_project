import { useSearchParams } from "react-router-dom";

export default function useURLPosition() {
  const [queryParams] = useSearchParams();

  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");
  return [lat, lng];
}
