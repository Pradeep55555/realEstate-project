

import React, { useMemo, useState } from "react";
import {
    PieChart, Pie, Cell, Tooltip as RechartTooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line, Legend, ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { Home, Users, UserCheck, MessageCircle } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet icon issue in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF4444"];

const Analytics = ({ properties = [], sellers = [], buyers = [], inquiries = [] }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [filters, setFilters] = useState({ city: "", state: "", type: "" });
    const [selectedBuyerYear, setSelectedBuyerYear] = useState("");

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filterByDateRange = (arr, key) => {
        if (!startDate && !endDate) return arr;
        return arr.filter((item) => {
            const date = dayjs(item[key]);
            const afterStart = startDate ? date.isAfter(startDate) || date.isSame(startDate, 'day') : true;
            const beforeEnd = endDate ? date.isBefore(endDate) || date.isSame(endDate, 'day') : true;
            return afterStart && beforeEnd;
        });
    };

    const filteredProperties = useMemo(() => {
        let data = filterByDateRange(properties, "post_date");
        if (filters.city) data = data.filter(p => p.city === filters.city);
        if (filters.state) data = data.filter(p => p.state === filters.state);
        if (filters.type) data = data.filter(p => p.property_type === filters.type);
        return data;
    }, [properties, startDate, endDate, filters]);

    const filteredBuyers = useMemo(() => filterByDateRange(buyers, "created_at"), [buyers, startDate, endDate]);

    const totalStats = {
        properties: filteredProperties.length,
        sellers: sellers.length,
        buyers: filteredBuyers.length,
        inquiries: inquiries.length || 0,
    };

    const propertyTypeData = useMemo(() => {
        const counts = {};
        filteredProperties.forEach(p => {
            const type = p.property_type || "Unknown";
            counts[type] = (counts[type] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [filteredProperties]);

    const propertiesByMonth = useMemo(() => {
        const counts = {};
        filteredProperties.forEach(p => {
            const month = dayjs(p.post_date).format("MMM YYYY");
            counts[month] = (counts[month] || 0) + 1;
        });
        return Object.entries(counts).map(([month, count]) => ({ month, count }));
    }, [filteredProperties]);

    const buyerActivity = useMemo(() => {
        const counts = {
            Jan: 0, Feb: 0, Mar: 0, Apr: 0,
            May: 0, Jun: 0, Jul: 0, Aug: 0,
            Sep: 0, Oct: 0, Nov: 0, Dec: 0
        };
        filteredBuyers.forEach(b => {
            const date = dayjs(b.created_on);
            if (!selectedBuyerYear || date.year().toString() === selectedBuyerYear) {
                const month = date.format("MMM");
                counts[month] = (counts[month] || 0) + 1;
            }
        });
        return Object.entries(counts).map(([month, count]) => ({ month, count }));
    }, [filteredBuyers, selectedBuyerYear]);

    const uniqueBuyerYears = useMemo(() => {
        const years = new Set();
        buyers.forEach(b => {
            const date = dayjs(b.created_on);
            years.add(date.year());
        });
        return Array.from(years).sort((a, b) => b - a);
    }, [buyers]);

    const topCities = useMemo(() => {
        const counts = {};
        properties.forEach(p => {
            const city = p.city || "Unknown";
            counts[city] = (counts[city] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([city, count]) => ({ city, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [properties]);

    const topStates = useMemo(() => {
        const counts = {};
        properties.forEach(p => {
            const state = p.state || "Unknown";
            counts[state] = (counts[state] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([state, count]) => ({ state, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [properties]);

    const avgPricePerType = useMemo(() => {
        const priceMap = {};
        filteredProperties.forEach(p => {
            const type = p.property_type || "Unknown";
            const price = parseFloat(p.price) || 0;
            if (!priceMap[type]) priceMap[type] = { total: 0, count: 0 };
            priceMap[type].total += price;
            priceMap[type].count += 1;
        });
        return Object.entries(priceMap).map(([type, { total, count }]) => ({
            type,
            avgPrice: parseInt(total / count)
        }));
    }, [filteredProperties]);

    const statCards = [
        {
            label: "Properties", value: totalStats.properties,
            icon: <Home size={28} />, bg: "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
        },
        {
            label: "Sellers", value: totalStats.sellers,
            icon: <Users size={28} />, bg: "bg-gradient-to-r from-green-400 to-green-600 text-white"
        },
        {
            label: "Buyers", value: totalStats.buyers,
            icon: <UserCheck size={28} />, bg: "bg-gradient-to-r from-purple-400 to-purple-600 text-white"
        },
        {
            label: "Inquiries", value: totalStats.inquiries,
            icon: <MessageCircle size={28} />, bg: "bg-gradient-to-r from-pink-400 to-pink-600 text-white"
        },
    ];

    const uniqueCities = [...new Set(properties.map(p => p.city))];
    const uniqueStates = [...new Set(properties.map(p => p.state))];
    const uniqueTypes = [...new Set(properties.map(p => p.property_type))];

    return (
        <div className={`p-4 space-y-6 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">📊 Admin Analytics Dashboard</h2>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                >
                    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
                <label className="text-sm flex items-center">
                    Start Date:
                    <input
                        type="date"
                        className="ml-2 border px-2 py-1 rounded text-black cursor-pointer"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>

                <label className="text-sm flex items-center">
                    End Date:
                    <input
                        type="date"
                        className="ml-2 border px-2 py-1 rounded text-black cursor-pointer"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>

                <select name="city" value={filters.city} onChange={handleFilterChange} className="border px-2 py-1 rounded text-black text-sm  cursor-pointer">
                    <option value="">Filter by City</option>
                    {uniqueCities.map((city, i) => (
                        <option key={i} value={city}>{city}</option>
                    ))}
                </select>

                <select name="state" value={filters.state} onChange={handleFilterChange} className="border px-2 py-1 rounded text-black text-sm  cursor-pointer">
                    <option value="">Filter by State</option>
                    {uniqueStates.map((state, i) => (
                        <option key={i} value={state}>{state}</option>
                    ))}
                </select>

                <select name="type" value={filters.type} onChange={handleFilterChange} className="border px-2 py-1 rounded text-black text-sm  cursor-pointer">
                    <option value="">Filter by Type</option>
                    {uniqueTypes.map((type, i) => (
                        <option key={i} value={type}>{type}</option>
                    ))}
                </select>

                <button
                    onClick={() => {
                        setStartDate("");
                        setEndDate("");
                        setFilters({ city: "", state: "", type: "" });
                    }}
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded border text-sm  cursor-pointer"
                >
                    Clear All Filters
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                    <div key={i} className={`${card.bg} rounded shadow-md p-4 text-center transform transition-all duration-300 hover:scale-105`}>
                        <div className="flex justify-center mb-2">{card.icon}</div>
                        <div className="text-sm uppercase">{card.label}</div>
                        <div className="text-3xl font-bold">{card.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow dark:bg-gray-800 hover:shadow-lg transition-all">
                    <h3 className="font-semibold mb-2">Property Distribution by Type</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie data={propertyTypeData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                                {propertyTypeData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <RechartTooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded shadow dark:bg-gray-800 hover:shadow-lg transition-all">
                    <h3 className="font-semibold mb-2">Properties Posted Per Month</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={propertiesByMonth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis allowDecimals={false} />
                            <RechartTooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#00C49F" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded shadow md:col-span-2 dark:bg-gray-800 hover:shadow-lg transition-all">
                    <h3 className="font-semibold mb-2 flex justify-between items-center">
                        Buyer Registrations Per Month
                        <select value={selectedBuyerYear} onChange={(e) => setSelectedBuyerYear(e.target.value)} className="ml-2 border px-2 py-1 rounded text-black text-sm  cursor-pointer">
                            <option value="">All Years</option>
                            {uniqueBuyerYears.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            ))}
                        </select>
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={buyerActivity}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis allowDecimals={false} />
                            <RechartTooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#FF8042" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded shadow dark:bg-gray-800 hover:shadow-lg transition-all">
                    <h3 className="font-semibold mb-2">Top Cities by Listings</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={topCities}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="city" />
                            <YAxis allowDecimals={false} />
                            <RechartTooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded shadow dark:bg-gray-800 hover:shadow-lg transition-all">
                    <h3 className="font-semibold mb-2">Top States by Listings</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={topStates}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="state" />
                            <YAxis allowDecimals={false} />
                            <RechartTooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#FFBB28" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/*  NEW: Avg Price Section with Bar and Pie */}
                <div className="bg-white p-4 rounded shadow md:col-span-2 dark:bg-gray-800 hover:shadow-lg transition-all">
                    <h3 className="font-semibold mb-4">Average Price by Property Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ResponsiveContainer width="100%" height={330}>
                            <BarChart data={avgPricePerType}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis allowDecimals={false} />
                                <RechartTooltip />
                                <Legend />
                                <Bar dataKey="avgPrice" fill="#AA66CC" />
                            </BarChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer width="100%" height={330}>
                            <PieChart>
                                <Pie
                                    data={avgPricePerType}
                                    dataKey="avgPrice"
                                    nameKey="type"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label={({ type, percent }) => `${type} (${(percent * 100).toFixed(0)}%)`}
                                >
                                    {avgPricePerType.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartTooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                <h3 className="font-semibold mb-2">Map View (Properties)</h3>
                <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    {filteredProperties.map((p, i) =>
                        p.latitude && p.longitude ? (
                            <Marker key={i} position={[p.latitude, p.longitude]}>
                                <Popup>{p.city}, {p.state}</Popup>
                            </Marker>
                        ) : null
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default Analytics;

