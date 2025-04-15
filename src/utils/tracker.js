const tracker = {
    userCode: localStorage.userCode,
    sessionStart: Date.now(),
    sessionEnd: null,
    sessionLength: null,
    totalSessionClicks: 0,
    islandClickOrder: [],
    islandCompletionOrder: [],
    queriesPerIsland: {}, // { islandId: number }
    queryTermsPerIsland: {}, // { islandId: number of terms }
    serpResultsPerIsland: [],
    // { islandId, title, snippet, position, clicked, clickOrder, timeSpent }
    serpClickOrderCounter: 0,
    firstClickTime: null,
    totalResultsClicked: 0,
    islandsMetadata: {},
    // { [islandId]: { question, answer, answeredWithAI, openTime, submitTime } }

    // --- Session tracking ---
    recordSessionClick() {
        this.totalSessionClicks += 1;
    },

    recordSessionEnd() {
        const now = Date.now();
        if (!this.sessionEnd) this.sessionEnd = now;
        this.sessionLength = Math.round((now - this.sessionStart) / 1000); // seconds
    },

    // --- Island metadata tracking ---
    recordIslandOpened(islandId, question) {
        this.islandsMetadata[ islandId ] = {
            ...(this.islandsMetadata[ islandId ] || {}),
            question,
            openTime: Date.now(),
        };
    },

    recordIslandSubmitted(islandId, answeredWithAI, userAnswer) {
        if (!this.islandsMetadata[ islandId ]) return;
        this.islandsMetadata[ islandId ].answeredWithAI = answeredWithAI;
        this.islandsMetadata[ islandId ].answer = userAnswer;
        this.islandsMetadata[ islandId ].submitTime = Date.now();
    },

    // --- Island navigation ---
    recordIslandClick(id) {
        this.islandClickOrder.push(id);
    },

    recordIslandCompletion(id) {
        this.islandCompletionOrder.push(id);
    },

    // --- Queries ---
    recordQuery(islandId, query) {
        this.queriesPerIsland[ islandId ] = (this.queriesPerIsland[ islandId ] || 0) + 1;
        const terms = query.trim().split(/\s+/).length;
        this.queryTermsPerIsland[ islandId ] = (this.queryTermsPerIsland[ islandId ] || 0) + terms;
    },

    // --- SERP Results Tracking ---
    recordSearchResult({ islandId, title, snippet, position }) {
        this.serpResultsPerIsland.push({
            islandId,
            title,
            snippet,
            position,
            clicked: false,
            clickOrder: null,
            timeSpent: null,
        });
    },

    recordSERPClick(position, timeSpent) {
        const result = this.serpResultsPerIsland.find(r => r.position === position && !r.clicked);
        if (result) {
            result.clicked = true;
            result.clickOrder = ++this.serpClickOrderCounter;
            result.timeSpent = timeSpent;
            this.totalResultsClicked += 1;
        }
    },

    getTimeBeforeFirstClick() {
        return this.firstClickTime ? Math.round((this.firstClickTime - this.sessionStart) / 1000) : null;
    },

    // --- Final export ---
    exportData() {
        return {
            userCode: this.userCode,
            sessionStart: this.sessionStart,
            sessionEnd: this.sessionEnd,
            sessionLength: this.sessionLength,
            totalSessionClicks: this.totalSessionClicks,
            islandClickOrder: this.islandClickOrder,
            islandCompletionOrder: this.islandCompletionOrder,
            queriesPerIsland: this.queriesPerIsland,
            queryTermsPerIsland: this.queryTermsPerIsland,
            serpResultsPerIsland: this.serpResultsPerIsland,
            totalResultsClicked: this.totalResultsClicked,
            timeBeforeFirstClickSeconds: this.getTimeBeforeFirstClick(),
            islandsMetadata: this.islandsMetadata,
        };
    },
};

export default tracker;
