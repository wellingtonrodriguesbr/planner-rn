import AsyncStorage from "@react-native-async-storage/async-storage";

const TRIP_STORAGE_KEY = "@planner:tripId";

export async function saveTripId(tripId: string) {
  try {
    await AsyncStorage.setItem(TRIP_STORAGE_KEY, tripId);
  } catch (error) {
    throw error;
  }
}

export async function getTripId() {
  try {
    const tripId = await AsyncStorage.getItem(TRIP_STORAGE_KEY);
    return tripId;
  } catch (error) {
    throw error;
  }
}

export async function removeTripId() {
  try {
    await AsyncStorage.removeItem(TRIP_STORAGE_KEY);
  } catch (error) {
    throw error;
  }
}
