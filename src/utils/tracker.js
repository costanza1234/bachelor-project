const tracker = {
    userCode: localStorage.userCode,
    totalSessionClicks: [], // { time, page }
    islandClickOrder: [],
    islandCompletionOrder: [],
    queriesPerIsland: {}, // { islandId: number }
    queryTermsPerIsland: {}, // { islandId: number of terms }
    serpResults: [], // { title, snippet, position, clicked, clickOrder, timeSpent }
    serpClickOrderCounter: 1,
    sessionStart: Date.now(),
    firstClickTime: null,
    totalResultsClicked: 0,

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
        this.queriesPerIsland[ islandId ] = (this.queriesPerIsland[ islandId ] || 0) + 1;
        const terms = query.trim().split(/\s+/).length;
        this.queryTermsPerIsland[ islandId ] = (this.queryTermsPerIsland[ islandId ] || 0) + terms;
    },

    recordSearchResult({ title, snippet, position }) {
        this.serpResults.push({
            title,
            snippet,
            position,
            clicked: false,
            clickOrder: null,
            timeSpent: null,
        });
    },

    recordSERPClick(position, timeSpent) {
        const result = this.serpResults.find(r => r.position === position);
        if (result && !result.clicked) {
            result.clicked = true;
            result.clickOrder = this.serpClickOrderCounter++;
            result.timeSpent = timeSpent;
            this.totalResultsClicked += 1;
        }
    },

    getSessionLength() {
        return Math.round((Date.now() - this.sessionStart) / 1000); // in seconds
    },

    getTimeBeforeFirstClick() {
        return this.firstClickTime ? Math.round((this.firstClickTime - this.sessionStart) / 1000) : null;
    },

    exportData() {
        return {
            userCode: this.userCode,
            totalClicks: this.totalSessionClicks.length,
            clicks: this.totalSessionClicks,
            islandClickOrder: this.islandClickOrder,
            islandCompletionOrder: this.islandCompletionOrder,
            queriesPerIsland: this.queriesPerIsland,
            queryTermsPerIsland: this.queryTermsPerIsland,
            serpResults: this.serpResults,
            totalResultsClicked: this.totalResultsClicked,
            sessionLengthSeconds: this.getSessionLength(),
            timeBeforeFirstClickSeconds: this.getTimeBeforeFirstClick(),
        };
    },
};

export default tracker;
