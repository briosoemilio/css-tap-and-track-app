import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TextFieldOutline from "src/components/TextField/TextFieldOutline";
import { ComputerDetails } from "src/services/computer/types";
import { getComputerDetails } from "src/services/computer/getComputerDetails";
import { formatDate } from "src/helpers/formatDate";
import TextField from "src/components/TextField/TextField";
import Button from "src/components/Button";
import { Dropdown } from "src/components/Dropdown/Dropdown";

const ReportComputer = (props: { id: number }) => {
  const [computerDetails, setComputerDetails] = useState<ComputerDetails>();
  const [selectedPeripheral, setSelectedPeripheral] = useState<string>();

  const loadDetails = async () => {
    try {
      const res = await getComputerDetails(props.id);
      setComputerDetails(res);
    } catch (err) {
      console.log("Error loading computer details -> ", err);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const now = new Date();

  return (
    <View>
      <TextFieldOutline
        label={"Computer"}
        value={computerDetails?.name as string}
        containerStyle={[styles.mb24, styles.mt50]}
        editable={false}
      />
      <TextFieldOutline
        label={"Date"}
        value={formatDate(now.toISOString())}
        containerStyle={styles.mb24}
        editable={false}
      />
      <Dropdown
        label="Peripheral"
        options={[
          {
            id: 0,
            label: "Agriculture",
            value: "Agreecultre",
          },
          {
            id: 1,
            label: "Business and Information",
            value: "Biznez and Info",
          },
        ]}
        value={selectedPeripheral as unknown as string}
        onSelect={(option) =>
          setSelectedPeripheral(option.value as unknown as string)
        }
        placeholder="Select peripheral"
      />
      <TextField
        label={"Remarks"}
        textInputStyle={{
          height: 300,
          textAlignVertical: "top",
          marginBottom: 24,
        }}
        placeholder="Write your concern here..."
      />
      <Button title="Submit" />
    </View>
  );
};

export default ReportComputer;

const styles = StyleSheet.create({
  mb24: { marginBottom: 24 },
  mt50: { marginTop: 50 },
});
