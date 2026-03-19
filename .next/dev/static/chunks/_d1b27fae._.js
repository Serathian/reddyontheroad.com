(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/SplitLayout/SplitLayout.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "SplitLayout-module__tk6JYW__container",
  "contentPane": "SplitLayout-module__tk6JYW__contentPane",
  "mapPane": "SplitLayout-module__tk6JYW__mapPane",
});
}),
"[project]/app/components/SplitLayout/SplitLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplitLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/SplitLayout/SplitLayout.module.css [app-client] (css module)");
;
;
function SplitLayout({ map, content }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mapPane,
                "aria-label": "Map view",
                children: map
            }, void 0, false, {
                fileName: "[project]/app/components/SplitLayout/SplitLayout.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentPane,
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
_c = SplitLayout;
var _c;
__turbopack_context__.k.register(_c, "SplitLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Carousel/DayCard.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "DayCard-module__kVkfwa__card",
  "date": "DayCard-module__kVkfwa__date",
  "location": "DayCard-module__kVkfwa__location",
  "openButton": "DayCard-module__kVkfwa__openButton",
  "preview": "DayCard-module__kVkfwa__preview",
});
}),
"[project]/app/components/Carousel/DayCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DayCard",
    ()=>DayCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$DayCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/Carousel/DayCard.module.css [app-client] (css module)");
'use client';
;
;
;
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
const DayCard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ entry, isActive, onOpen }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        ref: ref,
        "data-id": entry.id,
        "data-active": isActive,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$DayCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$DayCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].date,
                children: formatDate(entry.date)
            }, void 0, false, {
                fileName: "[project]/app/components/Carousel/DayCard.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$DayCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].location,
                children: entry.location
            }, void 0, false, {
                fileName: "[project]/app/components/Carousel/DayCard.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$DayCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].preview,
                children: entry.preview
            }, void 0, false, {
                fileName: "[project]/app/components/Carousel/DayCard.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isActive && onOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$DayCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].openButton,
                onClick: onOpen,
                children: "Open full day"
            }, void 0, false, {
                fileName: "[project]/app/components/Carousel/DayCard.tsx",
                lineNumber: 35,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Carousel/DayCard.tsx",
        lineNumber: 25,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = DayCard;
DayCard.displayName = 'DayCard';
var _c, _c1;
__turbopack_context__.k.register(_c, "DayCard$forwardRef");
__turbopack_context__.k.register(_c1, "DayCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Carousel/SkeletonCard.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "SkeletonCard-module__zpNZXW__card",
  "date": "SkeletonCard-module__zpNZXW__date",
  "location": "SkeletonCard-module__zpNZXW__location",
  "preview": "SkeletonCard-module__zpNZXW__preview",
  "shimmer": "SkeletonCard-module__zpNZXW__shimmer",
});
}),
"[project]/app/components/Carousel/SkeletonCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SkeletonCard",
    ()=>SkeletonCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$SkeletonCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/Carousel/SkeletonCard.module.css [app-client] (css module)");
;
;
function SkeletonCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$SkeletonCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$SkeletonCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].date
            }, void 0, false, {
                fileName: "[project]/app/components/Carousel/SkeletonCard.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$SkeletonCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].location
            }, void 0, false, {
                fileName: "[project]/app/components/Carousel/SkeletonCard.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$SkeletonCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].preview
            }, void 0, false, {
                fileName: "[project]/app/components/Carousel/SkeletonCard.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Carousel/SkeletonCard.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = SkeletonCard;
var _c;
__turbopack_context__.k.register(_c, "SkeletonCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Carousel/Carousel.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "carousel": "Carousel-module__nu5vFW__carousel",
});
}),
"[project]/app/components/Carousel/Carousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Carousel",
    ()=>Carousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$DayCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Carousel/DayCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$SkeletonCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Carousel/SkeletonCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$Carousel$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/Carousel/Carousel.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function Carousel({ entries, isLoading = false, onActiveChange, activeId, onOpenDay, containerRef }) {
    _s();
    const [uncontrolledActiveId, setUncontrolledActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const observerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const lastNotifiedActiveId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const suppressObserverUntil = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const resolvedActiveId = activeId ?? uncontrolledActiveId;
    const setResolvedActiveId = (nextId)=>{
        if (activeId === undefined) {
            setUncontrolledActiveId(nextId);
        }
        if (lastNotifiedActiveId.current !== nextId) {
            onActiveChange?.(nextId);
            lastNotifiedActiveId.current = nextId;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Carousel.useEffect": ()=>{
            // Create observer with center-detection configuration
            const observer = new IntersectionObserver({
                "Carousel.useEffect": (observerEntries)=>{
                    if (Date.now() < suppressObserverUntil.current) {
                        return;
                    }
                    const visibleEntries = observerEntries.filter({
                        "Carousel.useEffect.visibleEntries": (entry)=>entry.isIntersecting
                    }["Carousel.useEffect.visibleEntries"]);
                    if (visibleEntries.length === 0) {
                        return;
                    }
                    const viewportCenter = window.innerHeight / 2;
                    const closestToCenter = visibleEntries.map({
                        "Carousel.useEffect": (entry)=>{
                            const rect = entry.boundingClientRect;
                            const cardCenter = rect.top + rect.height / 2;
                            return {
                                id: entry.target.getAttribute('data-id'),
                                distance: Math.abs(cardCenter - viewportCenter)
                            };
                        }
                    }["Carousel.useEffect"]).filter({
                        "Carousel.useEffect": (item)=>Boolean(item.id)
                    }["Carousel.useEffect"]).sort({
                        "Carousel.useEffect": (a, b)=>a.distance - b.distance
                    }["Carousel.useEffect"])[0];
                    if (closestToCenter?.id) {
                        setResolvedActiveId(closestToCenter.id);
                    }
                }
            }["Carousel.useEffect"], {
                root: null,
                rootMargin: '-40% 0px -40% 0px',
                threshold: 0
            });
            observerRef.current = observer;
            // Observe all cards
            cardRefs.current.forEach({
                "Carousel.useEffect": (card)=>observer.observe(card)
            }["Carousel.useEffect"]);
            // CRITICAL: Cleanup on unmount (prevents memory leaks)
            return ({
                "Carousel.useEffect": ()=>observer.disconnect()
            })["Carousel.useEffect"];
        }
    }["Carousel.useEffect"], [
        entries,
        activeId,
        onActiveChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Carousel.useEffect": ()=>{
            // Keep controlled activeId in sync with visual center when selection
            // comes from external controls (e.g. timeline scrubber).
            if (!activeId) {
                return;
            }
            const activeCard = cardRefs.current.get(activeId);
            if (!activeCard) {
                return;
            }
            if (typeof activeCard.scrollIntoView !== 'function') {
                return;
            }
            // Avoid observer feedback loops while programmatically centering card
            suppressObserverUntil.current = Date.now() + 250;
            activeCard.scrollIntoView({
                block: 'center',
                behavior: 'auto'
            });
        }
    }["Carousel.useEffect"], [
        activeId
    ]);
    // Loading state: show skeleton cards
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$Carousel$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].carousel,
            children: [
                ...Array(3)
            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$SkeletonCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkeletonCard"], {}, i, false, {
                    fileName: "[project]/app/components/Carousel/Carousel.tsx",
                    lineNumber: 115,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/app/components/Carousel/Carousel.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$Carousel$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].carousel,
        "data-testid": "carousel-container",
        ref: containerRef,
        children: entries.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$DayCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DayCard"], {
                entry: entry,
                isActive: resolvedActiveId === entry.id,
                onOpen: resolvedActiveId === entry.id ? ()=>onOpenDay?.(entry.id) : undefined,
                ref: (el)=>{
                    // Ref callback pattern for dynamic list
                    if (el) {
                        cardRefs.current.set(entry.id, el);
                    } else {
                        cardRefs.current.delete(entry.id);
                    }
                }
            }, entry.id, false, {
                fileName: "[project]/app/components/Carousel/Carousel.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/components/Carousel/Carousel.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s(Carousel, "wZkwz83mYQhOYHm/5/gPW3nkpeI=");
_c = Carousel;
var _c;
__turbopack_context__.k.register(_c, "Carousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mapData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TRAIL_MAX_OPACITY",
    ()=>TRAIL_MAX_OPACITY,
    "TRAIL_MIN_OPACITY",
    ()=>TRAIL_MIN_OPACITY,
    "TRAIL_WINDOW_SIZE",
    ()=>TRAIL_WINDOW_SIZE,
    "buildStopPointsGeoJSON",
    ()=>buildStopPointsGeoJSON,
    "buildTrailGeoJSON",
    ()=>buildTrailGeoJSON,
    "getTrailWindow",
    ()=>getTrailWindow
]);
const TRAIL_WINDOW_SIZE = 7;
const TRAIL_MIN_OPACITY = 0.25;
const TRAIL_MAX_OPACITY = 0.95;
function clampActiveIndex(length, activeIndex) {
    if (length === 0) return -1;
    if (activeIndex < 0) return 0;
    if (activeIndex > length - 1) return length - 1;
    return activeIndex;
}
function getTrailWindow(entries, activeIndex) {
    const boundedActiveIndex = clampActiveIndex(entries.length, activeIndex);
    if (boundedActiveIndex < 0) {
        return [];
    }
    const startIndex = Math.max(0, boundedActiveIndex - (TRAIL_WINDOW_SIZE - 1));
    return entries.slice(startIndex, boundedActiveIndex + 1);
}
function buildTrailGeoJSON(entries, activeIndex) {
    const trailWindow = getTrailWindow(entries, activeIndex);
    return {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    pointCount: trailWindow.length
                },
                geometry: {
                    type: 'LineString',
                    coordinates: trailWindow.map((entry)=>[
                            entry.longitude,
                            entry.latitude
                        ])
                }
            }
        ]
    };
}
function buildStopPointsGeoJSON(entries, activeIndex) {
    const trailWindow = getTrailWindow(entries, activeIndex);
    const lastWindowIndex = trailWindow.length - 1;
    const denominator = Math.max(lastWindowIndex, 1);
    return {
        type: 'FeatureCollection',
        features: trailWindow.map((entry, index)=>{
            const ageIndex = lastWindowIndex - index;
            const ageProgress = index / denominator;
            const ageOpacity = Number((TRAIL_MIN_OPACITY + ageProgress * (TRAIL_MAX_OPACITY - TRAIL_MIN_OPACITY)).toFixed(3));
            return {
                type: 'Feature',
                properties: {
                    id: entry.id,
                    ageIndex,
                    ageOpacity,
                    isCurrent: index === lastWindowIndex
                },
                geometry: {
                    type: 'Point',
                    coordinates: [
                        entry.longitude,
                        entry.latitude
                    ]
                }
            };
        })
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Map/mapContracts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CAMERA_DURATION_MS",
    ()=>CAMERA_DURATION_MS,
    "CAMERA_DURATION_RANGE_MS",
    ()=>CAMERA_DURATION_RANGE_MS,
    "CAMERA_STABLE_ZOOM",
    ()=>CAMERA_STABLE_ZOOM,
    "MAPTILER_API_KEY_ENV_VAR",
    ()=>MAPTILER_API_KEY_ENV_VAR,
    "MAPTILER_DEFAULT_STYLE_ID",
    ()=>MAPTILER_DEFAULT_STYLE_ID,
    "NEAR_DISTANCE_SUBTLE_PAN_THRESHOLD_KM",
    ()=>NEAR_DISTANCE_SUBTLE_PAN_THRESHOLD_KM,
    "TRAIL_WINDOW_SIZE",
    ()=>TRAIL_WINDOW_SIZE,
    "buildMapTilerStyleUrl",
    ()=>buildMapTilerStyleUrl
]);
const MAPTILER_API_KEY_ENV_VAR = 'NEXT_PUBLIC_MAPTILER_API_KEY';
const MAPTILER_DEFAULT_STYLE_ID = 'streets-v2';
function buildMapTilerStyleUrl(apiKey, styleId = MAPTILER_DEFAULT_STYLE_ID) {
    return `https://api.maptiler.com/maps/${styleId}/style.json?key=${apiKey}`;
}
const CAMERA_DURATION_RANGE_MS = {
    min: 1200,
    preferred: 1400,
    max: 1600
};
const CAMERA_DURATION_MS = {
    pan: 1200,
    fly: 1500
};
const CAMERA_STABLE_ZOOM = {
    preferred: 8.75,
    min: 7.75,
    max: 9.75
};
const NEAR_DISTANCE_SUBTLE_PAN_THRESHOLD_KM = 40;
const TRAIL_WINDOW_SIZE = 7;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Map/mapLayers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "currentStopLayer",
    ()=>currentStopLayer,
    "pastStopsLayer",
    ()=>pastStopsLayer,
    "trailLineLayer",
    ()=>trailLineLayer
]);
const trailLineLayer = {
    id: 'journey-trail-line',
    type: 'line',
    source: 'journey-trail',
    layout: {
        'line-cap': 'round',
        'line-join': 'round'
    },
    paint: {
        'line-color': '#6F4E37',
        'line-width': [
            'interpolate',
            [
                'linear'
            ],
            [
                'zoom'
            ],
            3,
            2,
            9,
            4,
            13,
            6
        ],
        'line-opacity': 0.75
    }
};
const pastStopsLayer = {
    id: 'journey-past-stops',
    type: 'circle',
    source: 'journey-stops',
    filter: [
        '==',
        [
            'get',
            'isCurrent'
        ],
        false
    ],
    paint: {
        'circle-radius': [
            'interpolate',
            [
                'linear'
            ],
            [
                'zoom'
            ],
            3,
            3,
            10,
            5,
            13,
            6
        ],
        'circle-color': '#8D6E63',
        'circle-stroke-color': '#3E2723',
        'circle-stroke-width': 1,
        'circle-opacity': [
            'coalesce',
            [
                'get',
                'ageOpacity'
            ],
            0.35
        ]
    }
};
const currentStopLayer = {
    id: 'journey-current-stop',
    type: 'circle',
    source: 'journey-stops',
    filter: [
        '==',
        [
            'get',
            'isCurrent'
        ],
        true
    ],
    paint: {
        'circle-radius': [
            'interpolate',
            [
                'linear'
            ],
            [
                'zoom'
            ],
            3,
            5,
            10,
            8,
            13,
            10
        ],
        'circle-color': '#E8D8B9',
        'circle-stroke-color': '#3E2723',
        'circle-stroke-width': 2,
        'circle-opacity': 1,
        'circle-blur': 0.08
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Map/JourneyMap.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "JourneyMap-module__vBP8WG__container",
  "currentMarker": "JourneyMap-module__vBP8WG__currentMarker",
  "currentMarkerAnimated": "JourneyMap-module__vBP8WG__currentMarkerAnimated",
  "currentPulse": "JourneyMap-module__vBP8WG__currentPulse",
  "map": "JourneyMap-module__vBP8WG__map",
  "marker": "JourneyMap-module__vBP8WG__marker",
  "mobileHint": "JourneyMap-module__vBP8WG__mobileHint",
  "pastMarker": "JourneyMap-module__vBP8WG__pastMarker",
  "popup": "JourneyMap-module__vBP8WG__popup",
});
}),
"[project]/app/components/Map/JourneyMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JourneyMap",
    ()=>JourneyMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/maplibre-gl/dist/maplibre-gl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-map-gl/dist/maplibre.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Map__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@vis.gl/react-maplibre/dist/components/map.js [app-client] (ecmascript) <export Map as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@vis.gl/react-maplibre/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mapData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mapData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapContracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Map/mapContracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapLayers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Map/mapLayers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/Map/JourneyMap.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function distanceKm(a, b) {
    const toRad = (deg)=>deg * Math.PI / 180;
    const earthRadiusKm = 6371;
    const dLat = toRad(b.latitude - a.latitude);
    const dLon = toRad(b.longitude - a.longitude);
    const lat1 = toRad(a.latitude);
    const lat2 = toRad(b.latitude);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * earthRadiusKm * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
function useReducedMotionPreference() {
    _s();
    const [reducedMotion, setReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useReducedMotionPreference.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || typeof window.matchMedia !== 'function') return;
            const media = window.matchMedia('(prefers-reduced-motion: reduce)');
            const sync = {
                "useReducedMotionPreference.useEffect.sync": ()=>setReducedMotion(media.matches)
            }["useReducedMotionPreference.useEffect.sync"];
            sync();
            media.addEventListener('change', sync);
            return ({
                "useReducedMotionPreference.useEffect": ()=>media.removeEventListener('change', sync)
            })["useReducedMotionPreference.useEffect"];
        }
    }["useReducedMotionPreference.useEffect"], []);
    return reducedMotion;
}
_s(useReducedMotionPreference, "Z/efR3eUxGiWxs70VtFjzm6j4zM=");
function useIsMobileViewport() {
    _s1();
    const [isMobileViewport, setIsMobileViewport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIsMobileViewport.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const updateViewport = {
                "useIsMobileViewport.useEffect.updateViewport": ()=>setIsMobileViewport(window.innerWidth <= 768)
            }["useIsMobileViewport.useEffect.updateViewport"];
            updateViewport();
            window.addEventListener('resize', updateViewport);
            return ({
                "useIsMobileViewport.useEffect": ()=>window.removeEventListener('resize', updateViewport)
            })["useIsMobileViewport.useEffect"];
        }
    }["useIsMobileViewport.useEffect"], []);
    return isMobileViewport;
}
_s1(useIsMobileViewport, "4uZI0he+M/lbr1BDJv6AcAYRlXY=");
function JourneyMap({ entries, activeEntryId, mapApiKey }) {
    _s2();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [popupEntryId, setPopupEntryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const reducedMotion = useReducedMotionPreference();
    const isMobileViewport = useIsMobileViewport();
    const activeIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "JourneyMap.useMemo[activeIndex]": ()=>Math.max(0, entries.findIndex({
                "JourneyMap.useMemo[activeIndex]": (entry)=>entry.id === activeEntryId
            }["JourneyMap.useMemo[activeIndex]"]))
    }["JourneyMap.useMemo[activeIndex]"], [
        entries,
        activeEntryId
    ]);
    const activeEntry = entries[activeIndex];
    const previousEntryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const trailGeoJSON = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "JourneyMap.useMemo[trailGeoJSON]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mapData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTrailGeoJSON"])(entries, activeIndex)
    }["JourneyMap.useMemo[trailGeoJSON]"], [
        entries,
        activeIndex
    ]);
    const stopPointsGeoJSON = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "JourneyMap.useMemo[stopPointsGeoJSON]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mapData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildStopPointsGeoJSON"])(entries, activeIndex)
    }["JourneyMap.useMemo[stopPointsGeoJSON]"], [
        entries,
        activeIndex
    ]);
    const resolveMapHandle = ()=>{
        const candidate = mapRef.current;
        return candidate?.current ?? candidate ?? null;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JourneyMap.useEffect": ()=>{
            const mapHandle = resolveMapHandle();
            if (!activeEntry || !mapHandle) {
                previousEntryRef.current = activeEntry ?? null;
                return;
            }
            const previousEntry = previousEntryRef.current;
            if (!previousEntry || previousEntry.id === activeEntry.id) {
                previousEntryRef.current = activeEntry;
                return;
            }
            mapHandle.stop();
            const center = [
                activeEntry.longitude,
                activeEntry.latitude
            ];
            const nearMove = distanceKm(previousEntry, activeEntry) < __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapContracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEAR_DISTANCE_SUBTLE_PAN_THRESHOLD_KM"];
            if (nearMove) {
                mapHandle.easeTo({
                    center,
                    duration: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapContracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAMERA_DURATION_MS"].pan,
                    zoom: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapContracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAMERA_STABLE_ZOOM"].preferred,
                    essential: true
                });
            } else {
                mapHandle.flyTo({
                    center,
                    duration: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapContracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAMERA_DURATION_MS"].fly,
                    zoom: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapContracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAMERA_STABLE_ZOOM"].preferred,
                    essential: true
                });
            }
            previousEntryRef.current = activeEntry;
        }
    }["JourneyMap.useEffect"], [
        activeEntry
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JourneyMap.useEffect": ()=>{
            setPopupEntryId(null);
        }
    }["JourneyMap.useEffect"], [
        activeEntryId
    ]);
    if (!activeEntry) return null;
    const popupEntry = popupEntryId ? entries.find((entry)=>entry.id === popupEntryId) ?? null : null;
    const resolvedMapApiKey = mapApiKey ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env[__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapContracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAPTILER_API_KEY_ENV_VAR"]] ?? '';
    const mapStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapContracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMapTilerStyleUrl"])(resolvedMapApiKey);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Map__as__default$3e$__["default"], {
                ref: mapRef,
                mapLib: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                reuseMaps: true,
                mapStyle: mapStyle,
                initialViewState: {
                    longitude: activeEntry.longitude,
                    latitude: activeEntry.latitude,
                    zoom: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapContracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CAMERA_STABLE_ZOOM"].preferred
                },
                attributionControl: false,
                logoPosition: "bottom-right",
                style: {
                    width: '100%',
                    height: '100%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Source"], {
                        id: "journey-trail",
                        type: "geojson",
                        data: trailGeoJSON,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapLayers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trailLineLayer"]
                        }, void 0, false, {
                            fileName: "[project]/app/components/Map/JourneyMap.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/Map/JourneyMap.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Source"], {
                        id: "journey-stops",
                        type: "geojson",
                        data: stopPointsGeoJSON,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                                ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapLayers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pastStopsLayer"]
                            }, void 0, false, {
                                fileName: "[project]/app/components/Map/JourneyMap.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                                ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$mapLayers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentStopLayer"]
                            }, void 0, false, {
                                fileName: "[project]/app/components/Map/JourneyMap.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Map/JourneyMap.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    stopPointsGeoJSON.features.map((feature)=>{
                        const [longitude, latitude] = feature.geometry.coordinates;
                        const id = feature.properties.id;
                        const isCurrent = feature.properties.isCurrent;
                        if (!isCurrent && isMobileViewport) {
                            return null;
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                            longitude: longitude,
                            latitude: latitude,
                            anchor: "center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].marker} ${isCurrent ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].currentMarker : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pastMarker} ${isCurrent && !reducedMotion ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].currentMarkerAnimated : ''}`,
                                "data-testid": isCurrent ? 'current-stop' : 'past-stop',
                                "data-state": isCurrent ? 'current' : 'past',
                                "data-animated": isCurrent && !reducedMotion ? 'true' : 'false',
                                "data-emphasis": isCurrent ? 'static' : 'muted',
                                "aria-label": isCurrent ? 'Current location' : 'Past stop',
                                onClick: ()=>setPopupEntryId(id),
                                style: {
                                    opacity: isCurrent ? 1 : feature.properties.ageOpacity
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/Map/JourneyMap.tsx",
                                lineNumber: 187,
                                columnNumber: 15
                            }, this)
                        }, id, false, {
                            fileName: "[project]/app/components/Map/JourneyMap.tsx",
                            lineNumber: 186,
                            columnNumber: 13
                        }, this);
                    }),
                    popupEntry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vis$2e$gl$2f$react$2d$maplibre$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        longitude: popupEntry.longitude,
                        latitude: popupEntry.latitude,
                        onClose: ()=>setPopupEntryId(null),
                        closeButton: true,
                        closeOnClick: false,
                        anchor: "top",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].popup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: popupEntry.location
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Map/JourneyMap.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, this),
                                popupEntry.date
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Map/JourneyMap.tsx",
                            lineNumber: 213,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/Map/JourneyMap.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Map/JourneyMap.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileHint,
                "aria-hidden": true,
                children: "Tap markers for details"
            }, void 0, false, {
                fileName: "[project]/app/components/Map/JourneyMap.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Map/JourneyMap.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
_s2(JourneyMap, "T66tNB5ut0NvL9Ixj9SYZveoeGg=", false, function() {
    return [
        useReducedMotionPreference,
        useIsMobileViewport
    ];
});
_c = JourneyMap;
var _c;
__turbopack_context__.k.register(_c, "JourneyMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/richContent/photoShuffle.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSessionPhotoOrder",
    ()=>getSessionPhotoOrder,
    "shufflePhotosForDay",
    ()=>shufflePhotosForDay
]);
const PHOTO_ORDER_KEY_PREFIX = 'photo-order:';
function getStorageKey(entryId) {
    return `${PHOTO_ORDER_KEY_PREFIX}${entryId}`;
}
function createShuffledOrder(length) {
    const order = Array.from({
        length
    }, (_, index)=>index);
    for(let i = order.length - 1; i > 0; i -= 1){
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [
            order[j],
            order[i]
        ];
    }
    return order;
}
function isValidOrder(value, length) {
    if (!Array.isArray(value)) {
        return false;
    }
    if (value.length !== length) {
        return false;
    }
    const isWithinRange = value.every((index)=>Number.isInteger(index) && index >= 0 && index < length);
    if (!isWithinRange) {
        return false;
    }
    return new Set(value).size === length;
}
function getSessionPhotoOrder(entryId, photoCount) {
    if (photoCount <= 0 || ("TURBOPACK compile-time value", "object") === 'undefined') {
        return [];
    }
    const storageKey = getStorageKey(entryId);
    const cached = window.sessionStorage.getItem(storageKey);
    if (cached) {
        try {
            const parsed = JSON.parse(cached);
            if (isValidOrder(parsed, photoCount)) {
                return parsed;
            }
        } catch  {
        // ignore malformed cached values and rewrite below
        }
    }
    const order = createShuffledOrder(photoCount);
    window.sessionStorage.setItem(storageKey, JSON.stringify(order));
    return order;
}
function shufflePhotosForDay(entryId, photos) {
    if (!photos || photos.length === 0) {
        return [];
    }
    const order = getSessionPhotoOrder(entryId, photos.length);
    if (order.length === 0) {
        return [
            ...photos
        ];
    }
    return order.map((index)=>photos[index]);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/PhotoCollage/PhotoCollage.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "caption": "PhotoCollage-module__-H8jGW__caption",
  "controls": "PhotoCollage-module__-H8jGW__controls",
  "emptyMessage": "PhotoCollage-module__-H8jGW__emptyMessage",
  "grid": "PhotoCollage-module__-H8jGW__grid",
  "navButton": "PhotoCollage-module__-H8jGW__navButton",
  "photo": "PhotoCollage-module__-H8jGW__photo",
  "photoButton": "PhotoCollage-module__-H8jGW__photoButton",
  "wrapper": "PhotoCollage-module__-H8jGW__wrapper",
});
}),
"[project]/app/components/PhotoCollage/PhotoCollage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PhotoCollage",
    ()=>PhotoCollage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yet$2d$another$2d$react$2d$lightbox$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/yet-another-react-lightbox/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/PhotoCollage/PhotoCollage.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PhotoCollage({ photos = [] }) {
    _s();
    const [isLightboxOpen, setIsLightboxOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const slides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PhotoCollage.useMemo[slides]": ()=>photos.map({
                "PhotoCollage.useMemo[slides]": (photo)=>({
                        src: photo.url,
                        alt: photo.alt,
                        title: photo.caption
                    })
            }["PhotoCollage.useMemo[slides]"])
    }["PhotoCollage.useMemo[slides]"], [
        photos
    ]);
    if (photos.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyMessage,
            children: "No photos for this day"
        }, void 0, false, {
            fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
            lineNumber: 23,
            columnNumber: 12
        }, this);
    }
    const openAt = (index)=>{
        setActiveIndex(index);
        setIsLightboxOpen(true);
    };
    const goPrevious = ()=>{
        setActiveIndex((current)=>current === 0 ? photos.length - 1 : current - 1);
    };
    const goNext = ()=>{
        setActiveIndex((current)=>current === photos.length - 1 ? 0 : current + 1);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
        "aria-label": "Photo collage",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                children: photos.map((photo, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].photoButton,
                        onClick: ()=>openAt(index),
                        "aria-label": `Open photo ${index + 1}${photo.caption ? `: ${photo.caption}` : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: photo.url,
                                alt: photo.alt,
                                width: 380,
                                height: 280,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].photo
                            }, void 0, false, {
                                fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            photo.caption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].caption,
                                children: photo.caption
                            }, void 0, false, {
                                fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
                                lineNumber: 57,
                                columnNumber: 30
                            }, this) : null
                        ]
                    }, `${photo.url}-${index}`, true, {
                        fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            isLightboxOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controls,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButton,
                        onClick: goPrevious,
                        children: "Previous photo"
                    }, void 0, false, {
                        fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButton,
                        onClick: goNext,
                        children: "Next photo"
                    }, void 0, false, {
                        fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButton,
                        onClick: ()=>setIsLightboxOpen(false),
                        children: "Close lightbox"
                    }, void 0, false, {
                        fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yet$2d$another$2d$react$2d$lightbox$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
                open: isLightboxOpen,
                close: ()=>setIsLightboxOpen(false),
                index: activeIndex,
                slides: slides
            }, void 0, false, {
                fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/PhotoCollage/PhotoCollage.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(PhotoCollage, "CqZpuvt5KW8tyPQ+hKXHLRoNJrQ=");
_c = PhotoCollage;
var _c;
__turbopack_context__.k.register(_c, "PhotoCollage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/FullDayView/FullDayView.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "chip": "FullDayView-module__t1OCEG__chip",
  "container": "FullDayView-module__t1OCEG__container",
  "date": "FullDayView-module__t1OCEG__date",
  "diary": "FullDayView-module__t1OCEG__diary",
  "header": "FullDayView-module__t1OCEG__header",
  "location": "FullDayView-module__t1OCEG__location",
  "metaChips": "FullDayView-module__t1OCEG__metaChips",
  "photos": "FullDayView-module__t1OCEG__photos",
});
}),
"[project]/app/components/FullDayView/FullDayView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FullDayView",
    ()=>FullDayView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-gfm/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$richContent$2f$photoShuffle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/richContent/photoShuffle.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/PhotoCollage/PhotoCollage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/FullDayView/FullDayView.module.css [app-client] (css module)");
'use client';
;
;
;
;
;
;
function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function FullDayView({ entry }) {
    const shuffledPhotos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$richContent$2f$photoShuffle$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shufflePhotosForDay"])(entry.id, entry.photos);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        "aria-label": "Full day entry",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].date,
                        children: formatDate(entry.date)
                    }, void 0, false, {
                        fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].location,
                        children: entry.location
                    }, void 0, false, {
                        fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    entry.weather || typeof entry.distanceMiles === 'number' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metaChips,
                        children: [
                            entry.weather ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chip,
                                children: entry.weather
                            }, void 0, false, {
                                fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                                lineNumber: 33,
                                columnNumber: 30
                            }, this) : null,
                            typeof entry.distanceMiles === 'number' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chip,
                                children: [
                                    entry.distanceMiles,
                                    " miles"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].diary,
                "aria-label": "Diary",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                    remarkPlugins: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                    ],
                    children: entry.diary
                }, void 0, false, {
                    fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].photos,
                "aria-label": "Photos",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$PhotoCollage$2f$PhotoCollage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PhotoCollage"], {
                    photos: shuffledPhotos
                }, void 0, false, {
                    fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/FullDayView/FullDayView.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = FullDayView;
var _c;
__turbopack_context__.k.register(_c, "FullDayView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/TimelineScrubber/TimelineScrubber.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "interacting": "TimelineScrubber-module__O_N3nq__interacting",
  "motorhomeIcon": "TimelineScrubber-module__O_N3nq__motorhomeIcon",
  "preview": "TimelineScrubber-module__O_N3nq__preview",
  "range": "TimelineScrubber-module__O_N3nq__range",
  "scrubber": "TimelineScrubber-module__O_N3nq__scrubber",
  "srOnly": "TimelineScrubber-module__O_N3nq__srOnly",
});
}),
"[project]/app/components/TimelineScrubber/TimelineScrubber.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimelineScrubber",
    ()=>TimelineScrubber
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/TimelineScrubber/TimelineScrubber.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function clamp(value, min, max) {
    if (!Number.isFinite(value)) {
        return min;
    }
    return Math.max(min, Math.min(max, value));
}
function buildAnnouncement(entries, index) {
    const entry = entries[index] ?? entries[0];
    if (!entry) {
        return 'Day 0 of 0';
    }
    const date = new Date(entry.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return `Day ${index + 1} of ${entries.length}: ${date}, ${entry.location}`;
}
function buildDayCountLabel(total, index) {
    return `Day ${index + 1} of ${total}`;
}
function TimelineScrubber({ entries, activeIndex, onDayChange }) {
    _s();
    const maxIndex = Math.max(0, entries.length - 1);
    const safeIndex = clamp(activeIndex, 0, maxIndex);
    const [draftValue, setDraftValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(safeIndex);
    const [isInteracting, setIsInteracting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isInteractingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const draftValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(safeIndex);
    const draftIndex = clamp(Math.round(draftValue), 0, maxIndex);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimelineScrubber.useEffect": ()=>{
            if (isInteractingRef.current) {
                return;
            }
            setDraftValue(safeIndex);
            draftValueRef.current = safeIndex;
        }
    }["TimelineScrubber.useEffect"], [
        safeIndex
    ]);
    const announcement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimelineScrubber.useMemo[announcement]": ()=>buildAnnouncement(entries, draftIndex)
    }["TimelineScrubber.useMemo[announcement]"], [
        entries,
        draftIndex
    ]);
    const dayCountLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimelineScrubber.useMemo[dayCountLabel]": ()=>buildDayCountLabel(entries.length, draftIndex)
    }["TimelineScrubber.useMemo[dayCountLabel]"], [
        entries.length,
        draftIndex
    ]);
    const thumbPercent = maxIndex > 0 ? draftValue / maxIndex * 100 : 0;
    const handleInput = (value)=>{
        isInteractingRef.current = true;
        setIsInteracting(true);
        setDraftValue(value);
        draftValueRef.current = value;
    };
    const commitDraft = (value)=>{
        const source = value ?? draftValueRef.current;
        const snapped = clamp(Math.round(source), 0, maxIndex);
        if (!isInteracting && snapped === safeIndex) {
            return;
        }
        setDraftValue(snapped);
        draftValueRef.current = snapped;
        isInteractingRef.current = false;
        setIsInteracting(false);
        onDayChange(snapped);
    };
    const handleKeyDown = (event)=>{
        if (event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft') {
            return;
        }
        event.preventDefault();
        isInteractingRef.current = true;
        setIsInteracting(true);
        const delta = event.key === 'ArrowUp' || event.key === 'ArrowRight' ? -1 : 1;
        const next = clamp(Math.round(draftValue) + delta, 0, maxIndex);
        setDraftValue(next);
        draftValueRef.current = next;
    };
    const handleKeyUp = (event)=>{
        if (event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft') {
            return;
        }
        commitDraft();
    };
    if (entries.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scrubber} ${isInteracting ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].interacting : ''}`.trim(),
        style: {
            '--thumb-percent': `${thumbPercent}%`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].srOnly,
                htmlFor: "journey-timeline-range",
                children: "Journey timeline"
            }, void 0, false, {
                fileName: "[project]/app/components/TimelineScrubber/TimelineScrubber.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].motorhomeIcon,
                "data-testid": "timeline-motorhome-icon",
                "data-icon": "motorhome",
                "aria-hidden": "true",
                children: "🚐"
            }, void 0, false, {
                fileName: "[project]/app/components/TimelineScrubber/TimelineScrubber.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: "journey-timeline-range",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].range,
                type: "range",
                min: 0,
                max: maxIndex,
                step: 0.1,
                value: draftValue,
                "aria-label": "Journey timeline",
                "aria-valuetext": announcement,
                onInput: (event)=>handleInput(Number(event.currentTarget.value)),
                onChange: (event)=>handleInput(Number(event.currentTarget.value)),
                onPointerDown: ()=>{
                    isInteractingRef.current = true;
                    setIsInteracting(true);
                },
                onPointerUp: (event)=>commitDraft(Number(event.currentTarget.value)),
                onPointerCancel: ()=>commitDraft(),
                onMouseUp: (event)=>commitDraft(Number(event.currentTarget.value)),
                onTouchEnd: (event)=>commitDraft(Number(event.currentTarget.value)),
                onBlur: ()=>commitDraft(),
                onKeyDown: handleKeyDown,
                onKeyUp: handleKeyUp
            }, void 0, false, {
                fileName: "[project]/app/components/TimelineScrubber/TimelineScrubber.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].preview,
                "data-testid": "timeline-preview",
                "aria-hidden": "true",
                children: dayCountLabel
            }, void 0, false, {
                fileName: "[project]/app/components/TimelineScrubber/TimelineScrubber.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].srOnly,
                "aria-live": "polite",
                children: announcement
            }, void 0, false, {
                fileName: "[project]/app/components/TimelineScrubber/TimelineScrubber.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/TimelineScrubber/TimelineScrubber.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(TimelineScrubber, "W6Fc0mj8m7AMfaRrf7uAERxJgMI=");
_c = TimelineScrubber;
var _c;
__turbopack_context__.k.register(_c, "TimelineScrubber");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mockData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    },
    {
        id: 'entry-004',
        date: '2024-06-18',
        location: 'Meteora, Greece',
        latitude: 39.7217,
        longitude: 21.6306,
        preview: 'Monasteries perched on impossible rock pillars. Monks built these 600 years ago without modern tools — humbling.',
        diary: `# Monasteries in the Sky

Arrived at Meteora in late afternoon. The rock formations are otherworldly - massive pillars of stone rising from the valley floor.

Climbed to the Great Meteoron monastery at sunset. Six hundred years ago, monks hauled building materials up these cliffs using rope and baskets. The frescoes inside are perfectly preserved.

Met a monk who's lived here for thirty years. He said the hardest part isn't the isolation, it's the tourists. We both laughed. He gave me walnuts from the monastery garden.

The silence at dawn is complete. No cars, no voices, just wind through the rocks and distant bells.`,
        weather: 'Clear, 24°C',
        distanceMiles: 140
    },
    {
        id: 'entry-005',
        date: '2024-06-19',
        location: 'Thessaloniki, Greece',
        latitude: 40.6401,
        longitude: 22.9444,
        preview: 'Second city, first impressions. Byzantine walls, Ottoman markets, and the best street food in Greece.',
        diary: `# City of Ghosts

Thessaloniki feels lived-in in a way Athens doesn't. Layers of history stacked on top of each other - Roman ruins, Byzantine churches, Ottoman markets, modern cafes.

Walked the old city walls this morning. The fortifications are massive, built to withstand sieges. You can see the Thermaic Gulf from the towers.

Lunch at Modiano Market. Fresh seafood, spices, olives. Got into a conversation with a fishmonger about the best way to cook sardines. He insisted I try his family recipe.

Evening in Ladadika district. Old warehouse buildings converted to bars and restaurants. Live music spilling into the streets. This city knows how to live.`,
        weather: 'Warm, 29°C',
        distanceMiles: 195,
        photos: [
            {
                url: '/photos/thessaloniki-walls.jpg',
                caption: 'Byzantine city walls at sunset',
                alt: 'Ancient stone fortifications overlooking the sea'
            }
        ]
    },
    {
        id: 'entry-006',
        date: '2024-06-20',
        location: 'Olympus Base, Greece',
        latitude: 40.0855,
        longitude: 22.3583,
        preview: 'Attempted the trail to Mount Olympus. Made it halfway before weather turned. Zeus had other plans.',
        diary: `# Mountain of Gods

Started the hike to Mount Olympus at 6 AM. The goal was the summit at 2,917 meters. The trail begins in thick forest, then opens to alpine meadows.

Made good progress for four hours. The views were spectacular - mountains in every direction, eagles overhead.

Around 2,000 meters the weather changed fast. Clouds rolled in, temperature dropped, wind picked up. Guide said we should turn back. Disappointed but not stupid.

The Greeks built their gods' home on this mountain for a reason. It demands respect.

Spent the evening in Litochoro, the base town. Tomorrow: heading to the peninsula.`,
        weather: 'Started clear, became stormy, 18°C at altitude',
        distanceMiles: 50
    },
    {
        id: 'entry-007',
        date: '2024-06-21',
        location: 'Halkidiki Peninsula, Greece',
        latitude: 40.1411,
        longitude: 23.5528,
        preview: 'Three-fingered peninsula. Turquoise water, pine forests to the beach, and finally some quiet.',
        diary: `# Three Fingers, One Paradise

Halkidiki is shaped like a hand reaching into the Aegean - three peninsulas extending south. Stayed on Kassandra, the westernmost finger.

The beaches here are different from the islands. Pine forests come right down to the sand. The water is so clear you can see fish from the shore.

Rented a small boat for the afternoon. Followed the coastline, stopping at hidden coves. No one around for hours. Swimming in water this blue feels surreal.

Evening in a tiny fishing village. Grilled fish, white wine, conversation with locals about the best diving spots. They invited me back in September when the crowds are gone.`,
        weather: 'Perfect, 27°C',
        distanceMiles: 85,
        photos: [
            {
                url: '/photos/halkidiki-cove.jpg',
                caption: 'Hidden cove on Kassandra',
                alt: 'Turquoise water and white sand beach surrounded by pines'
            }
        ]
    },
    {
        id: 'entry-008',
        date: '2024-06-22',
        location: 'Crete, Greece',
        latitude: 35.2401,
        longitude: 25.1442,
        preview: 'Flew to Crete, largest of the Greek islands. Starting in Heraklion, heading to Knossos tomorrow.',
        diary: `# Island of Legends

Landed in Crete this afternoon. The island is massive - you could spend a month here easily.

Heraklion is rougher than I expected. More port city than tourist town. Walked the Venetian fortress at the harbor. Built in the 1500s, still imposing.

Dinner at a place locals recommended. Real Cretan food - dakos, lamb with stamnagathi, tsikoudia to finish. The owner explained the difference between Cretan and mainland Greek cuisine. It's all about the herbs.

Tomorrow: Knossos and the Palace of Minos. The center of Minoan civilization, older than classical Greece by a thousand years.

Can already tell this island is different. Wilder, more independent. The Cretans have always done things their own way.`,
        weather: 'Hot, 31°C',
        distanceMiles: 310
    },
    {
        id: 'entry-009',
        date: '2024-06-23',
        location: 'Knossos, Crete',
        latitude: 35.2979,
        longitude: 25.1632,
        preview: 'Palace of Minos. 4,000 years old. The reconstruction is controversial but gives you a sense of the scale.',
        diary: `# Labyrinth

Knossos is unlike any other ancient site. Part ruin, part reconstruction. Archaeologist Arthur Evans rebuilt sections in the early 1900s - purists hate it, but it helps visualize how it looked.

The palace is a maze. Hundreds of rooms, multiple stories, complex drainage systems. You understand why the Greeks told stories about labyrinths here.

The frescoes are beautiful - dolphins, bulls, priestesses. The famous bull-leaping fresco shows athletes vaulting over charging bulls. Was it sport, ritual, or mythology?

The Minoans had flush toilets and sophisticated plumbing 4,000 years ago. Then their civilization vanished, possibly destroyed by the volcanic eruption at Santorini.

Spent hours wandering the ruins, trying to imagine life here at its height. Tomorrow: Samaria Gorge, one of the longest in Europe.`,
        weather: 'Sunny, 30°C',
        distanceMiles: 3,
        photos: [
            {
                url: '/photos/knossos-dolphins.jpg',
                caption: 'Dolphin fresco in the Queen\'s chamber',
                alt: 'Ancient fresco showing blue dolphins swimming'
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backButton": "page-module__E0kJGG__backButton",
  "carouselWrapper": "page-module__E0kJGG__carouselWrapper",
  "fullDayLayer": "page-module__E0kJGG__fullDayLayer",
  "hidden": "page-module__E0kJGG__hidden",
  "layer": "page-module__E0kJGG__layer",
  "mapBoundScrubber": "page-module__E0kJGG__mapBoundScrubber",
  "rightPane": "page-module__E0kJGG__rightPane",
  "viewSwap": "page-module__E0kJGG__viewSwap",
  "visible": "page-module__E0kJGG__visible",
});
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/SplitLayout/SplitLayout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$Carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Carousel/Carousel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Map/JourneyMap.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/FullDayView/FullDayView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TimelineScrubber/TimelineScrubber.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mockData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/page.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function Home() {
    _s();
    const [activeEntryId, setActiveEntryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDailyEntries"][0].id);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('carousel');
    const carouselRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [savedScrollTop, setSavedScrollTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const activeIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[activeIndex]": ()=>Math.max(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDailyEntries"].findIndex({
                "Home.useMemo[activeIndex]": (entry)=>entry.id === activeEntryId
            }["Home.useMemo[activeIndex]"]))
    }["Home.useMemo[activeIndex]"], [
        activeEntryId
    ]);
    const activeEntry = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDailyEntries"][activeIndex];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const syncMobile = {
                "Home.useEffect.syncMobile": ()=>setIsMobile(window.innerWidth <= 768)
            }["Home.useEffect.syncMobile"];
            syncMobile();
            window.addEventListener('resize', syncMobile);
            return ({
                "Home.useEffect": ()=>window.removeEventListener('resize', syncMobile)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    const openFullDay = (id)=>{
        if (id !== activeEntryId) {
            return;
        }
        setSavedScrollTop(carouselRef.current?.scrollTop ?? 0);
        setViewMode('full');
    };
    const goBackToTimeline = ()=>{
        setViewMode('carousel');
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (viewMode !== 'carousel') {
                return;
            }
            if (!carouselRef.current) {
                return;
            }
            carouselRef.current.scrollTop = savedScrollTop;
        }
    }["Home.useEffect"], [
        viewMode,
        savedScrollTop
    ]);
    const handleDayIndexChange = (index)=>{
        const next = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDailyEntries"][index];
        if (!next) {
            return;
        }
        setActiveEntryId(next.id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$SplitLayout$2f$SplitLayout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        map: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Map$2f$JourneyMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JourneyMap"], {
            entries: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDailyEntries"],
            activeEntryId: activeEntryId,
            mapApiKey: ("TURBOPACK compile-time value", "kPypKp2P2qEtcdqNqB9U")
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 70,
            columnNumber: 9
        }, void 0),
        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightPane,
            "data-testid": "right-pane-mode",
            "data-view-mode": viewMode,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mapBoundScrubber,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TimelineScrubber$2f$TimelineScrubber$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimelineScrubber"], {
                        entries: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDailyEntries"],
                        activeIndex: activeIndex,
                        onDayChange: handleDayIndexChange
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 79,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 78,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].viewSwap,
                    "data-testid": "layout-shell",
                    "data-mobile-full": viewMode === 'full' && isMobile ? 'true' : 'false',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layer} ${viewMode === 'carousel' ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visible : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hidden}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].carouselWrapper,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Carousel$2f$Carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Carousel"], {
                                    entries: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockDailyEntries"],
                                    activeId: activeEntryId,
                                    onActiveChange: setActiveEntryId,
                                    onOpenDay: openFullDay,
                                    containerRef: carouselRef
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 17
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].layer} ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullDayLayer} ${viewMode === 'full' ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visible : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hidden}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                                    onClick: goBackToTimeline,
                                    children: "Back to timeline"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$FullDayView$2f$FullDayView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FullDayView"], {
                                    entry: activeEntry
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 77,
            columnNumber: 9
        }, void 0)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(Home, "EFxAhDS+wxh2g4MYKKnCi5OJVl4=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_d1b27fae._.js.map