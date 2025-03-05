import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
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
const storage = new Storage(client);

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

//function to uploadFile in app write
export const uploadFile = async (file, type) => {
  if (!file) throw new Error("No file provided");

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    // Upload file to storage
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    console.log(`Uploaded ${type} file. ID: ${uploadedFile.$id}`);

    // Get file preview URL
    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    if (!fileUrl)
      throw new Error(`Failed to generate preview URL for ${type} file`);

    return { fileId: uploadedFile.$id, fileUrl };
  } catch (error) {
    console.error(`Error uploading ${type} file:`, error);
    throw error;
  }
};

//function to get getFilePreview
export const getFilePreview = async (fileId, type) => {
  try {
    if (!fileId) throw new Error("File ID is missing");

    let fileUrl;

    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) {
      throw new Error(
        `Failed to generate preview URL for ${type} file: ${fileId}`
      );
    }

    console.log(`Generated ${type} preview URL:`, fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Error fetching file preview:", error);
    throw error;
  }
};

//function to create file in app write, where I can upload the video and thumbnail and get the url

export const createVideo = async (form) => {
  console.log("form data from createVideo", form);
  try {
    const [thumbnailData, videoData] = await Promise.all([
      uploadFile(form.thumbnail, "image"), // Returns { fileId, fileUrl }
      uploadFile(form.video, "video"), // Returns { fileId, fileUrl }
    ]);

    console.log("Thumbnail Data:", thumbnailData);
    console.log("Video Data:", videoData);

    if (!thumbnailData?.fileUrl) throw new Error("Thumbnail URL is missing");
    if (!videoData?.fileId) throw new Error("Video file ID is missing");

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailData?.fileUrl, // Extract only the URL
        video: videoData?.fileUrl, // Extract only the URL
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    console.log("Successfully created video document:", newPost);
    return newPost;
  } catch (error) {
    console.error("Error creating video document:", error);
  }
};
