import { api } from "./api";

export type TripDetails = {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
};

type TripCreate = Omit<TripDetails, "id" | "is_confirmed"> & {
  emails_to_invite: string[];
};

async function getTripById(id: string) {
  try {
    const { data } = await api.get<{ trip: TripDetails }>(`/trips/${id}`);
    return data.trip;
  } catch (error) {
    throw error;
  }
}

async function createTrip(createData: TripCreate) {
  try {
    const { data } = await api.post<{ tripId: string }>("trips", {
      ...createData,
      owner_name: "Wellington Rodrigues",
      owner_email: "johndoe@example.com",
    });
    return data.tripId;
  } catch (error) {
    throw error;
  }
}

export const tripServer = { getTripById, createTrip };
