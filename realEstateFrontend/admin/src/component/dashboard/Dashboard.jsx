import React, { useState, useEffect } from "react";
import { Users, Home, ShoppingCart, Star, BarChart2, TrendingUp, UserCheck, DollarSign, } from "lucide-react";

const Dashboard = ({ stats }) => {

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Real Estate Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users className="w-8 h-8 text-blue-500" />} label="Total Sellers" value={stats.totalSellers.length} />
        <StatCard icon={<UserCheck className="w-8 h-8 text-green-500" />} label="Total Buyers" value={stats.totalBuyers.length} />
        <StatCard icon={<Home className="w-8 h-8 text-purple-500" />} label="Properties Posted" value={stats.totalPropertiesPosted.length} />
        <StatCard icon={<ShoppingCart className="w-8 h-8 text-yellow-500" />} label="Properties Sold" value={stats.totalPropertiesSold} />
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InsightCard title="Top Buyer" icon={<Star className="w-6 h-6 text-yellow-400" />}>
          {stats.topBuyer ? (
            <>
              <p className="text-lg font-semibold">{stats.topBuyer.full_name}</p>
              <p className="text-sm">{stats.topBuyer.buyer_mobile}</p>
              <p>Properties Bought: {stats.topBuyer.propertiesBought}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </InsightCard>

        <InsightCard title="Top Seller" icon={<TrendingUp className="w-6 h-6 text-green-400" />}>
          {stats.topSeller ? (
            <>
              <p className="text-lg font-semibold">{stats.topSeller.full_name}</p>
              <p className="text-sm">{stats.topSeller.seller_mobile}</p>
              <p>Properties Sold: {stats.topSeller.propertiesSold}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </InsightCard>

        <InsightCard title="Most Demanded Property Type" icon={<BarChart2 className="w-6 h-6 text-indigo-400" />}>
          <p className="text-lg font-semibold">{stats.mostDemandedPropertyType || "Loading..."}</p>
        </InsightCard>
      </div>

      {/* TODO: Add more components like charts, recent activities, user management etc */}
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
    <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value ?? "—"}</p>
    </div>
  </div>
);

const InsightCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <div>{children}</div>
  </div>
);

export default Dashboard;
