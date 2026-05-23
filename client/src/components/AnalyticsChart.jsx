import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsChart = ({ analytics }) => {

  const data = [
    {
      name: "Total Leads",
      value: analytics.totalLeads,
    },
    {
      name: "Qualified",
      value: analytics.qualifiedLeads,
    },
    {
      name: "Closed",
      value: analytics.closedDeals,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-6">
        Lead Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default AnalyticsChart;