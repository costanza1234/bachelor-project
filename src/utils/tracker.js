
const tracker = {
    userCode: null,
    totalSessionClicks: [],
    islandClickOrder: [],
    islandCompletionOrder: [],
    queriesPerTask: {}, // {islandId: number}
    serpClicks: [],
    sessionStart: Date.now(),
    firstClickTime: null,
    viewedResults: [], // { title, snippet, clicked }
    queryLengths: [],
    serpPagesViewed: 0,
    pageViewDurations: [],
    domains: new Set(),
    pagesViewed: new Set(),

    recordSessionClick(page) {
        const now = Date.now();
        if (!this.firstClickTime) this.firstClickTime = now;
        this.totalSessionClicks.push({ time: now, page });
    },

    recordIslandClick(id) {
        this.islandClickOrder.push(id);
    },

    recordIslandCompletion(id) {
        this.islandCompletionOrder.push(id);
    },

    recordQuery(islandId, query) {
        this.queriesPerTask[ islandId ] = (this.queriesPerTask[ islandId ] || 0) + 1;
        this.queryLengths.push(query.split(" ").length);
    },

    recordSERPClick(position, domain, page, time) {
        this.serpClicks.push({ position, domain, page, time });
        this.domains.add(domain);
        this.pagesViewed.add(page);
    },

    recordSearchResult(title, snippet, clicked = false) {
        this.viewedResults.push({ title, snippet, clicked });
    },

    recordPageView(page, duration) {
        this.pageViewDurations.push({ page, duration });
    },

    recordSERPPageViewed() {
        this.serpPagesViewed += 1;
    },

    getSessionLength() {
        return Date.now() - this.sessionStart;
    },

    exportData() {
        return {
            promptCode: this.promptCode,
            clicks: this.clicks,
            islandClickOrder: this.islandClickOrder,
            islandCompletionOrder: this.islandCompletionOrder,
            queriesPerTask: this.queriesPerTask,
            serpClicks: this.serpClicks,
            sessionLength: this.getSessionLength(),
            timeBeforeFirstClick: this.firstClickTime ? this.firstClickTime - this.sessionStart : null,
            viewedResults: this.viewedResults,
            queryLengths: this.queryLengths,
            serpPagesViewed: this.serpPagesViewed,
            pageViewDurations: this.pageViewDurations,
            numberOfDomains: this.domains.size,
            numberOfViewedPages: this.pagesViewed.size,
        };
    },
};

export default tracker;
