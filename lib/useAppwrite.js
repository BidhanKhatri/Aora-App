import { useEffect, useState } from "react";
import { Alert } from "react-native";

//custom hook for fetching data from appwrite
const useAppWrite = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("video data", data);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fn();

        setData(response);
      } catch (error) {
        Alert.alert("Error", error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // refresh = () => fetchData();
  }, []);

  return { data, loading };
};

export default useAppWrite;
