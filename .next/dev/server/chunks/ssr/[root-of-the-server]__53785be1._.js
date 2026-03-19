module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/components/SplitLayout/SplitLayout.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "SplitLayout-module__tk6JYW__container",
  "contentPane": "SplitLayout-module__tk6JYW__contentPane",
  "mapPane": "SplitLayout-module__tk6JYW__mapPane",
});
}),
"[project]/app/components/SplitLayout/SplitLayout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplitLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/SplitLayout/SplitLayout.module.css [app-rsc] (css module)");
;
;
function SplitLayout({ map, content }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].mapPane,
                "aria-label": "Map view",
                children: map
            }, void 0, false, {
                fileName: "[project]/app/components/SplitLayout/SplitLayout.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].contentPane,
                children: content
            }, void 0, false, {
                fileName: "[project]/app/components/SplitLayout/SplitLayout.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/SplitLayout/SplitLayout.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/mockData.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/mockData.ts
__turbopack_context__.s([
    "getAllLocations",
    ()=>getAllLocations,
    "getEntriesByDateRange",
    ()=>getEntriesByDateRange,
    "getEntryById",
    ()=>getEntryById,
    "mockDailyEntries",
    ()=>mockDailyEntries
]);
const mockDailyEntries = [
    {
        id: 'entry-001',
        date: '2024-06-15',
        location: 'Santorini, Greece',
        latitude: 36.3932,
        longitude: 25.4615,
        preview: 'Arrived in Santorini and witnessed the legendary sunset at Oia. The caldera turned deep blue as the sun melted into the Aegean.',
        diary: `# Sunset at Oia

Arrived in Santorini this morning. The famous blue-domed churches are even more stunning in person. Spent the afternoon exploring the narrow streets of Oia, getting lost in the maze of white-washed buildings.

Evening brought the legendary sunset. Hundreds of tourists gathered, but somehow it felt intimate. The sun melted into the Aegean, painting everything gold and orange. The caldera below turned deep blue.

Had dinner at a taverna overlooking the sea. Fresh octopus, Greek salad, and local wine. The owner told stories about the island before tourism took over.`,
        weather: 'Sunny, 28°C',
        distanceMiles: 150,
        photos: [
            {
                url: '/photos/santorini-sunset.jpg',
                caption: 'Sunset at Oia',
                alt: 'Golden sunset over white buildings and blue domes'
            }
        ]
    },
    {
        id: 'entry-002',
        date: '2024-06-16',
        location: 'Athens, Greece',
        latitude: 37.9838,
        longitude: 23.7275,
        preview: 'Early morning at the Acropolis to beat the crowds. The Parthenon is humbling — 2,500 years old and still standing.',
        diary: `# Acropolis Morning

Took the ferry back to Athens. The city feels different from the islands - louder, grittier, more real.

Started early at the Acropolis to beat the crowds and heat. Climbed the marble steps worn smooth by millions of feet. The Parthenon is humbling - how did they build this 2,500 years ago?

The view from the top shows Athens sprawling in every direction, mountains in the distance. You can see why this was the center of the ancient world.

Spent the afternoon in Plaka, the old neighborhood. Got hopelessly lost in the narrow streets. Found a bookshop selling old travel guides from the 1960s. Bought one as a souvenir.`,
        weather: 'Clear, 32°C',
        distanceMiles: 75
    },
    {
        id: 'entry-003',
        date: '2024-06-17',
        location: 'Delphi, Greece',
        latitude: 38.4824,
        longitude: 22.5010,
        preview: 'Drove to ancient Delphi, home of the Oracle. The mountain sanctuary feels mystical even today.',
        diary: `# Oracle and Mountains

Three-hour bus ride to Delphi through mountain roads. The driver played Greek music the whole way, singing along occasionally.

Delphi sits on the slopes of Mount Parnassus, overlooking a valley of olive groves. Ancient Greeks believed this was the center of the world. Standing here, you understand why.

The archaeological site is massive - theater, temple, treasury buildings. The stadium is at the very top, exhausting climb in the heat. Worth it for the view.

The museum has the bronze charioteer, one of the most beautiful ancient sculptures I've ever seen. His eyes are inlaid with precious stones, lifelike after 2,500 years.

Tomorrow: heading to Meteora to see the cliff-top monasteries.`,
        weather: 'Partly cloudy, 26°C',
        distanceMiles: 110,
        photos: [
            {
                url: '/photos/delphi-temple.jpg',
                caption: 'Temple of Apollo ruins',
                alt: 'Ancient stone columns against mountain backdrop'
            }
        ]
    }
];
function getEntryById(id) {
    return mockDailyEntries.find((entry)=>entry.id === id);
}
function getEntriesByDateRange(startDate, endDate) {
    return mockDailyEntries.filter((entry)=>entry.date >= startDate && entry.date <= endDate);
}
function getAllLocations() {
    return [
        ...new Set(mockDailyEntries.map((entry)=>entry.location))
    ];
}
}),
"[project]/app/page.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "date": "page-module__E0kJGG__date",
  "diary": "page-module__E0kJGG__diary",
  "distance": "page-module__E0kJGG__distance",
  "entriesList": "page-module__E0kJGG__entriesList",
  "entryCard": "page-module__E0kJGG__entryCard",
  "entryHeader": "page-module__E0kJGG__entryHeader",
  "location": "page-module__E0kJGG__location",
  "mapNote": "page-module__E0kJGG__mapNote",
  "mapPlaceholder": "page-module__E0kJGG__mapPlaceholder",
  "photoPlaceholder": "page-module__E0kJGG__photoPlaceholder",
  "photos": "page-module__E0kJGG__photos",
  "title": "page-module__E0kJGG__title",
  "weather": "page-module__E0kJGG__weather",
});
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/SplitLayout/SplitLayout.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mockData.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/page.module.css [app-rsc] (css module)");
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        map: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].mapPlaceholder,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "🗺️ Map will go here"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 10,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].mapNote,
                    children: "Interactive map showing journal entry locations"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 11,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 9,
            columnNumber: 9
        }, void 0),
        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].entriesList,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].title,
                    children: "Travel Journal"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, void 0),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mockDailyEntries"].map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].entryCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].entryHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].location,
                                        children: entry.location
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 23,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].date,
                                        children: new Date(entry.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 24,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 22,
                                columnNumber: 15
                            }, void 0),
                            entry.weather && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].weather,
                                children: [
                                    "☀️ ",
                                    entry.weather
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 35,
                                columnNumber: 17
                            }, void 0),
                            entry.distanceMiles && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].distance,
                                children: [
                                    "📍 ",
                                    entry.distanceMiles,
                                    " miles traveled"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 39,
                                columnNumber: 17
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].diary,
                                children: entry.diary.split('\n\n').map((paragraph, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: paragraph.replace(/^# /, '')
                                    }, i, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 47,
                                        columnNumber: 19
                                    }, void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, void 0),
                            entry.photos && entry.photos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].photos,
                                children: entry.photos.map((photo, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].photoPlaceholder,
                                                children: [
                                                    "📷 ",
                                                    photo.caption || 'Photo'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 55,
                                                columnNumber: 23
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                                                children: photo.caption
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 58,
                                                columnNumber: 23
                                            }, void 0)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 54,
                                        columnNumber: 21
                                    }, void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 52,
                                columnNumber: 17
                            }, void 0)
                        ]
                    }, entry.id, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 21,
                        columnNumber: 13
                    }, void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 17,
            columnNumber: 9
        }, void 0)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__53785be1._.js.map