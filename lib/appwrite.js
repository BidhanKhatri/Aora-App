import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.bidhan.aora",
  projectId: "67bed26e002517ba32b0",
  databaseId: "67bedec3003465acd590",
  userCollectionId: "67bedf89003b2714d354",
  videoCollectionId: "67bedf9b00302f916a5e",
  storageId: "67bee12b002929358769",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appWriteConfig; // destructure

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

//function to create user
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("unable to create user");
    const newSession = await signIn(email, password);

    const avatarUrl = avatar.getInitials(username);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

//function to signIn user

export const signIn = async (email, password) => {
  try {
    let currentSession;

    try {
      currentSession = await account.getSession("current");
    } catch {
      // No active session, proceed to create one
    }

    if (currentSession) {
      console.log("User is already signed in");
      return currentSession;
    }

    // Create a new session if no active one exists
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Sign-in Error:", error);
    throw new Error(error.message);
  }
};

//function to get current use
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("unable to get current user");

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

//function to get all video response

export const getVideos = async () => {
  try {
    const videos = await databases.listDocuments(databaseId, videoCollectionId);

    return videos.documents;
  } catch (error) {
    console.log(error);
  }
};

//function to get latest video response
export const getLatestVideo = async () => {
  try {
    const latestVideos = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.limit(7), Query.orderDesc("$createdAt")]
    );

    return latestVideos.documents;
  } catch (error) {
    console.log(error);
  }
};

//function to get the video response by search
export const getSearchVideo = async (query) => {
  try {
    const searchVideo = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search("title", query)]
    );

    return searchVideo.documents;
  } catch (error) {
    console.log(error);
  }
};

//function to get video by user to show in profile page
export const getVideoByUser = async (userId) => {
  try {
    const getUserVideo = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return getUserVideo.documents;
  } catch (error) {
    console.log(error);
  }
};

//function to logout the user
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (e) {
    console.log(e);
  }
};
