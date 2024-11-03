import { useNavigation } from "@react-navigation/native";
import { TrackNavProps } from "./TrackNavigator";

export const useTrackNavigation = () => useNavigation<TrackNavProps>();
