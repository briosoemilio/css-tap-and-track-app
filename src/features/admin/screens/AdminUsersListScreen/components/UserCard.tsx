import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { UserDetails } from "src/services/user/types";
import Text from "src/components/Text";
import { COLORS } from "src/constants/colors";
import { formatDate } from "src/helpers/formatDate";

const UserCard = (props: { userDetails: UserDetails; onPress: () => void }) => {
  const { userDetails, onPress } = props;
  const { name, yearSection, createdAt, idNumber } = userDetails;
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
      <View>
        <Text variant="body2bold">{name}</Text>
        <Text variant="body2regular">{idNumber}</Text>
      </View>
      <View>
        <Text variant="body2bold" textAlign="right">
          Created At:
        </Text>
        <Text variant="body2regular" textAlign="right">
          {formatDate(createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 12,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: COLORS.blue,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
