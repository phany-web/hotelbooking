import axios from "./axios";

export type ReportRange = "today" | "week" | "month" | "year";

export interface ReportResponse {
  totalBookings: number;
  totalRevenue: number;
  checkIns: number;
  occupancyRate: number;

  avgBookingValue: number;
  cancellationRate: number;
  peakOccupancy: string;

  recentActivities: {
    id: number;
    date: string;
    type: string;
    user: string;
    status: string;
    amount: number;
  }[];

  revenueChart: {
    date: string;
    revenue: number;
  }[];
}

export const getReports = async (
  range: ReportRange
): Promise<ReportResponse> => {
  const res = await axios.get(`/admin/reports?range=${range}`);
  return res.data;
};