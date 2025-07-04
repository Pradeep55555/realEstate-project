import React, { useState, useEffect } from "react";
import { LayoutDashboard, Users, UserCheck, Home, Star, BarChart2, FileText, } from "lucide-react";

import Dashboard from "../dashboard/Dashboard";
import Sellers from "../sellers/Sellers";
import Buyers from "../buyers/Buyers";
import Properties from "../properties/Properties";
import Reviews from "../reviews/Reviews";
import Analytics from "../analytics/Analytics"


const tabs = [
  { label: "Dashboard", value: "dashboard", icon: <LayoutDashboard className="w-4 h-4 " /> },
  { label: "Sellers", value: "sellers", icon: <Users className="w-4 h-4 cursor-pointer " /> },
  { label: "Buyers", value: "buyers", icon: <UserCheck className="w-4 h-4  cursor-pointer" /> },
  { label: "Properties", value: "properties", icon: <Home className="w-4 h-4 cursor-pointer" /> },
  { label: "Reviews", value: "reviews", icon: <Star className="w-4 h-4 cursor-pointer" /> },
  { label: "Analytics", value: "analytics", icon: <BarChart2 className="w-4 h-4 cursor-pointer" /> },
];

const AdminPanel = () => {

  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState({
    totalSellers: 0,
    totalBuyers: 0,
    totalPropertiesPosted: 0,
    totalPropertiesSold: 0,
    topBuyer: null,
    topSeller: null,
    mostDemandedPropertyType: null,
  });

  useEffect(() => {

    const fetchDetails = async () => {
      try {
        const res1 = await fetch('http://localhost:4000/all-sellers');
        const res2 = await fetch('http://localhost:4000/all-buyers');
        const res3 = await fetch('http://localhost:4000/all-properties');
        const res4 = await fetch('http://localhost:4000/top-buyer');
        const res5 = await fetch('http://localhost:4000/top-seller');
        const res6 = await fetch('http://localhost:4000/most-demanded-property-type');

        const sellers = await res1.json();
        const buyers = await res2.json();
        const properties = await res3.json();
        const topBuyer = await res4.json();
        const topSeller = await res5.json();
        const mostDemandedPropertyType = await res6.json();

        const soldCount = properties.filter(p => p.status === 'Sold').length;

        setStats({
          totalSellers: sellers,
          totalBuyers: buyers,
          totalPropertiesPosted: properties,
          totalPropertiesSold: soldCount,
          topBuyer: topBuyer,
          topSeller: topSeller,
          mostDemandedPropertyType: `${mostDemandedPropertyType.property_type} (${mostDemandedPropertyType.count})`,

        });
      } catch (err) {
        console.error("Failed to fetch sellers:", err);
      }
    };

    fetchDetails();
  }, []);

  const renderActiveTab = () => {
    try {
      switch (activeTab) {
        case "dashboard":
          return <Dashboard stats={stats} />;
        case "sellers":
          return <Sellers sellers={stats.totalSellers} />;
        case "buyers":
          return <Buyers buyers={stats.totalBuyers} />;
        case "properties":
          return <Properties properties={stats.totalPropertiesPosted} />;
        case "reviews":
          return <Reviews />;
        case "analytics":
          return <Analytics
            properties={stats.totalPropertiesPosted}
            sellers={stats.totalSellers}
            buyers={stats.totalBuyers}
          />;
        default:
          return <Dashboard />;
      }
    } catch (err) {
      console.error("Component rendering failed:", activeTab, err);
      return <div>Error rendering {activeTab} component</div>;
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-wrap gap-2 mb-6 bg-white p-3 rounded-lg shadow">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`flex items-center gap-2  cursor-pointer px-4 py-2 rounded-lg font-medium transition ${activeTab === tab.value
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-100"
              }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-6">{renderActiveTab()}</div>
    </div>
  );
};

export default AdminPanel;
