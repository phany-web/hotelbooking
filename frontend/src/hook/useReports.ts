import { useEffect, useState } from "react";
import type { ReportResponse } from "../services/report.service";
import { getReports } from "../services/report.service";

export const useReports = (range: string) => {
  const [data, setData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getReports(range as any);
      setData(res);
      setLoading(false);
    };

    fetch();
  }, [range]);

  return { data, loading };
};