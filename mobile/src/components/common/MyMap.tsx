import { Platform } from "react-native";
import MapView from "react-native-maps";

let MapComponent: any = MapView;
if (Platform.OS === "web") {
  try {
    MapComponent = require("react-native-web-maps").default;
  } catch {
    MapComponent = (props: any) => <div>Map not available</div>;
  }
}

export default function MyMap(props: any) {
  return <MapComponent {...props} />;
}
