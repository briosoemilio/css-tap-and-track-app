import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import ScreenContainer from "src/components/ScreenContainer";
import { CONSTANTS } from "src/constants/constants";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdminNavParams } from "src/navigation/AdminNavigator/AdminNavStack";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { useGetItemList } from "../AdminInventoryListScreen/hooks/useGetItemList";
import { ItemStatus } from "src/types/ItemStatus";
import ItemCard from "./components/ItemCard";
import { showUnderDevelopment } from "src/helpers/showUnderDevelopment";
import ListFooter from "./components/ListFooter";
import ListEmpty from "./components/ListEmpty";
import { useFormContext } from "react-hook-form";
import { ComputerCreatorForm } from "./AdminComputerCreatorScreen";
import { useAdminNavigation } from "src/navigation/AdminNavigator/useAdminNavigation";
import { getDevicePropertyName } from "./utils";

const AdminComputerPeripheralSelectScreen = () => {
  const route =
    useRoute<RouteProp<AdminNavParams, "computer-peripheral-select">>();
  const navigation = useAdminNavigation();
  const location = route.params?.location;
  const category = route.params?.category;

  const methods = useFormContext<ComputerCreatorForm>();

  const mainCategories = ["MOUSE", "KEYBOARD", "MONITOR", "SYSTEM_UNIT"];

  const onPressCard = (itemName: string, categoryName?: string) => {
    if (mainCategories.includes(category)) {
      const valueName = getDevicePropertyName(category);
      methods.setValue(valueName, itemName);
    } else {
      type OtherItem = { name: string; categoryName: string };
      const newItem: OtherItem = {
        name: itemName,
        categoryName: categoryName ?? "",
      };
      const currentOthers: OtherItem[] = methods.watch("others") || [];
      let itemUpdated = false;
      const newOthers = currentOthers.reduce<OtherItem[]>((acc, item) => {
        if (item.categoryName === categoryName) {
          itemUpdated = true;
          return [...acc, newItem];
        }
        return [...acc, item];
      }, []);

      if (!itemUpdated) {
        newOthers.push(newItem);
      }

      methods.setValue("others", newOthers);
    }
    navigation?.navigate("computer-creator");
  };

  const { itemList, endReached, isLoading, loadMoreItems } = useGetItemList(
    category,
    location,
    ItemStatus.AVAILABLE
  );

  return (
    <ScreenContainer>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.parameterContainer}>
            <Text variant="body2bold">Location: {location}</Text>
          </View>
          <View style={styles.parameterContainer}>
            <Text variant="body2bold">Category: {category}</Text>
          </View>
        </View>
        <Text variant="body2regular">
          Here are the list of available items with the parameters given above:
        </Text>
        <FlatList
          data={itemList}
          renderItem={({ item }) => (
            <ItemCard
              itemDetails={item}
              onPress={() => onPressCard(item.name, item.categoryName)}
            />
          )}
          keyExtractor={(_, index) => `key-${index}`}
          ListFooterComponent={() => {
            return (
              <ListFooter
                showFooter={!endReached && itemList.length > 0 && !isLoading}
                showLoader={isLoading}
                onPress={() => loadMoreItems()}
              />
            );
          }}
          ListEmptyComponent={() => !isLoading && <ListEmpty />}
        />
      </View>
    </ScreenContainer>
  );
};

export default AdminComputerPeripheralSelectScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: CONSTANTS.layout,
    flexGrow: 1,
    paddingTop: 20,
    gap: 15,
    display: "flex",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: 12,
  },
  parameterContainer: {
    padding: 4,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 12,
  },
});
