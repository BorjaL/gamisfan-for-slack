const config = {
    firebase: {
        databaseURL: process.env.FIREBASE_DATABASE_URL || "",
        serviceAccount: {
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
            private_key: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
            project_id: process.env.FIREBASE_PROJECT_ID || "",
        },
    },
    slack: {
        oAuthAccessToken: process.env.SLACK_OAUTH_ACCESS_TOKEN || "",
    },
};

export { config };
