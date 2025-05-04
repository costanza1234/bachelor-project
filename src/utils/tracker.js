const tracker = {
    // userCode is handled in the GameStart component
    userCode: null,
    // startTime is handled in the GameStart component
    startTime: null,
    // islandCompletion is handled in the IslandContext and Answer component
    islandCompletion: [],
    // island order of click {islandID, islandPositionInMap} is handled in the Map component
    islandClickOrder: [],
    // totalClicksInSession is handled in App.js
    totalClicksInSession: 0,
    // timeBeforeFirstClickSeconds is handled in App.js
    timeBeforeFirstClickSeconds: null,
    // finishTime is handled in the Answer component
    finishTime: null,
    // sessionLength is handled in the Answer component
    sessionLength: null,
    // score is handled in the Answer component
    score: 0,

    islands: [ {
        islandID: null,
        islandData: {
            openTime: null,
            submitTime: null,
            answeredWithAI: null,
            numberOfQueries: null,
            queryTerms: null,

            // choiceForAnswer is a list of 0 or 1. 
            // If the user performs a search using Google, a 0 is pushed in the array, similarly a 1 is pushed when the user prompts AI. 
            // The length of the array is equal to the number of queries / prompts made by the user.
            // The array is used to understand if the user has used AI or Google to or both and how many times they performes the switch in order to answer the given question.
            choiceForAnswer: [],
            SERPAnswers: {
                title: null,
                snippet: null,
                position: null,
                clicked: false,
                clickOrder: null,
                timeSpentOnPage: null,
            },
            userAnswer: null,
        },
    } ],

    recordIslandClick(islandID, islandPosition) {
        this.islandClickOrder.push({ islandID, islandPosition });
        this.totalClicksInSession++;
    },
    incrementScore(points) {
        this.score += points;
    },
    // setters
    setUserCode(userCode) {
        this.userCode = userCode;
    },
    setStartTime(startTime) {
        this.startTime = startTime;
    },
    setFinishTime(finishTime) {
        this.finishTime = finishTime;
    },
    setSessionLength(sessionLength) {
        this.sessionLength = sessionLength;
    },
    setTimeBeforeFirstClickSeconds(timeBeforeFirstClickSeconds) {
        this.timeBeforeFirstClickSeconds = timeBeforeFirstClickSeconds;
    },
    setIsland(island) {
        // check if islandID is already in the islands array
        const islandIndex = this.islands.findIndex((i) => i.islandID === island.islandID);
        if (islandIndex !== -1) {
            // if it is, update the island data
            this.islands[ islandIndex ].islandData = island.islandData;
            return;
        }

        console.log("island not found, adding new island");
        // if it is not, add the island to the islands array
        this.islands.push(island);
    },

    setOpenTime(islandID, openTime) {
        const islandIndex = this.islands.findIndex((i) => i.islandID === islandID);
        if (islandIndex !== -1) {
            this.islands[ islandIndex ].islandData.openTime = openTime;
        }
    },
    setSubmitTime(islandID, submitTime) {
        const islandIndex = this.islands.findIndex((i) => i.islandID === islandID);
        if (islandIndex !== -1) {
            this.islands[ islandIndex ].islandData.submitTime = submitTime;
        }
    },
    setAnsweredWithAI(islandID, answeredWithAI) {
        const islandIndex = this.islands.findIndex((i) => i.islandID === islandID);
        if (islandIndex !== -1) {
            this.islands[ islandIndex ].islandData.answeredWithAI = answeredWithAI;
        }
    },
    setNumberOfQueries(islandID, numberOfQueries) {
        const islandIndex = this.islands.findIndex((i) => i.islandID === islandID);
        if (islandIndex !== -1) {
            this.islands[ islandIndex ].islandData.numberOfQueries = numberOfQueries;
        }
    },
    setQueryTerms(islandID, queryTerms) {
        const islandIndex = this.islands.findIndex((i) => i.islandID === islandID);
        if (islandIndex !== -1) {
            this.islands[ islandIndex ].islandData.queryTerms = queryTerms;
        }
    },
    setAIAnswer(islandID, AIAnswer) {
        const islandIndex = this.islands.findIndex((i) => i.islandID === islandID);
        if (islandIndex !== -1) {
            this.islands[ islandIndex ].islandData.AIAnswer = AIAnswer;
        }
    },
    setSERPAnswers(islandID, SERPAnswers) {
        const islandIndex = this.islands.findIndex((i) => i.islandID === islandID);
        if (islandIndex !== -1) {
            this.islands[ islandIndex ].islandData.SERPAnswers = SERPAnswers;
        }
    },
    setUserAnswer(islandID, userAnswer) {
        const islandIndex = this.islands.findIndex((i) => i.islandID === islandID);
        if (islandIndex !== -1) {
            this.islands[ islandIndex ].islandData.userAnswer = userAnswer;
        }
    },


    // Export
    exportData() {
        return {
            userCode: this.userCode,
            startTime: this.startTime,
            finishTime: this.finishTime,
            sessionLength: this.sessionLength,
            islandOrder: this.islandOrder,
            totalClicksInSession: this.totalClicksInSession,
            timeBeforeFirstClickSeconds: this.timeBeforeFirstClickSeconds,
            islands: this.islands,
        };
    },
};

export default tracker;
