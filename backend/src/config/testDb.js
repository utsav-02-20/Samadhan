import mongoose from "mongoose";

const getTestDbConnection = () => {
  const mainUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  let testUri = process.env.TEST_MONGO_URI;

  if (!testUri && mainUri) {
    if (mainUri.includes("?")) {
      const [base, query] = mainUri.split("?");
      testUri = (base.endsWith("/samadhan") ? base.slice(0, -9) + "/test" : base + "/test") + "?" + query;
    } else {
      testUri = mainUri.endsWith("/samadhan") ? mainUri.slice(0, -9) + "/test" : mainUri + "/test";
    }
  } else if (!testUri) {
    testUri = "mongodb://127.0.0.1:27017/test";
  }

  return mongoose.createConnection(testUri, { serverSelectionTimeoutMS: 5000 });
};

const testDbConnection = getTestDbConnection();

testDbConnection.on("connected", () => {
  console.log("Department model connected to TEST database successfully");
});

testDbConnection.on("error", (err) => {
  console.error("TEST database connection warning for Department:", err.message);
});

export default testDbConnection;
