import { Dimensions } from "react-native";
import SkeletonContent from "react-native-skeleton-content";
const { width, height } = Dimensions.get("window");
export default function ImageSkeleton() {
  return (
    <SkeletonContent
      containerStyle={{ flex: 1, width: 300 }}
      animationDirection="horizontalLeft"
      isLoading={true}
      layout={[{ width: width, height: height * 0.6 }]}
    />
  );
}
