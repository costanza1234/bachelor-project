import questions from "../data/questions.js";

const tracker = {
    // userCode is handled in the GameStart component
    userCode: null,
    // startTime is handled in the GameStart component
    startTime: null,
    // islandCompletionOrder is handled in the IslandContext and Answer component
    islandCompletionOrder: [],
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
            // question is handled in the initializeIslands function called in the GameStart component
            question: null,
            // sentiment is handled in the initializeIslands function called in the GameStart component
            sentiment: null,
            // openTime is handled in the Map component in the handleClick function
            openTime: null,
            // submitTime is handled in the Answer component
            submitTime: null,
            // choiceForAnswer is a list of 0 or 1. 
            // If the user performs a search using Google, a 0 is pushed in the array, similarly a 1 is pushed when the user prompts AI. 
            // The length of the array is equal to the number of queries / prompts made by the user.
            // The array is used to understand if the user has used AI or Google to or both and how many times they performes the switch in order to answer the given question.
            choiceForAnswer: [],
            //  [{AI: 0 or 1, numberOfQueryTerms: numberOfQueryTerms}, ...], this means that the length of the array is equal to the number of queries made by the user, the flag AI is 0 if the user used Google and 1 if the user used AI. The numberOfQueryTerms is the number of terms used in the query/prompt. This is handled in the QuestionPage component.
            numberOfQueryTermsPerQuery: [],
            // AIAnswers is a list of answers given by the AI. The length of the array is equal to the number of prompts made by the user. This is handled in the QuestionPage component.
            AIAnswers: [],
            // SERPAnswers is a list of answers given by Google. The length of the array is equal to the number of queries made by the user times 30, as for every query, we return 30 responses. This is handled in the QuestionPage component.
            // an entry has the following structure:
            /* {
                title: String,
                snippet: String,
                position: Number,
                clicked: Boolean,
                clickOrder: Number,
                timeSpentOnPage: Number milliseconds,
            }  */

            SERPAnswers: [],
            userAnswer: null,
        },
    } ],

    // for each of the six islands, initialize the islandID and islandData
    initializeIslands(islands) {

        for (let i = 0; i < islands.length; i++) {
            var islandID = islands[ i ];
            this.islands[ i ] = {
                islandID: islandID,
                islandData: {
                    question: questions[ islandID - 1 ].text,
                    sentiment: questions[ islandID - 1 ].sentiment,
                    openTime: null,
                    submitTime: null,
                    choiceForAnswer: [],
                    numberOfQueryTermsPerQuery: [],
                    AIAnswers: [],
                    SERPAnswers: [],
                    userAnswer: null,
                },
            };
        }

    },

    recordIslandClick(islandID, islandPosition) {
        this.islandClickOrder.push({ islandID, islandPosition });
        this.totalClicksInSession++;
    },

    incrementScore(points) {
        this.score += points;
    },

    // Export
    exportData() {
        return {
            userCode: this.userCode,
            startTime: this.startTime,
            islandCompletionOrder: this.islandCompletionOrder,
            islandClickOrder: this.islandClickOrder,
            totalClicksInSession: this.totalClicksInSession,
            timeBeforeFirstClickSeconds: this.timeBeforeFirstClickSeconds,
            finishTime: this.finishTime,
            sessionLength: this.sessionLength,
            score: this.score,
            islands: this.islands.map(island => ({
                islandID: island.islandID,
                islandData: {
                    question: island.islandData.question,
                    sentiment: island.islandData.sentiment,
                    openTime: island.islandData.openTime,
                    submitTime: island.islandData.submitTime,
                    choiceForAnswer: island.islandData.choiceForAnswer,
                    numberOfQueryTermsPerQuery: island.islandData.numberOfQueryTermsPerQuery,
                    AIAnswers: island.islandData.AIAnswers,
                    // Filter SERPAnswers to only include clicked ones
                    SERPAnswers: island.islandData.SERPAnswers.filter(ans => ans.clicked),
                    userAnswer: island.islandData.userAnswer,
                },
            })),
        };
    },
};

export default tracker;
