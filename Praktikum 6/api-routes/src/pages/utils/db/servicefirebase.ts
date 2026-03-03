import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  try {
    console.log("Fetching from collection:", collectionName);
    const snapshot = await getDocs(collection(db, collectionName));
    console.log("Snapshot empty:", snapshot.empty);
    console.log("Snapshot size:", snapshot.size);
    
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    console.log("Mapped data:", data);
    return data;
  } catch (error) {
    console.error("Error in retrieveProducts:", error);
    throw error;
  }
}