import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Text from "src/components/Text";
import TextFieldOutline from "src/components/TextField/TextFieldOutline";
import Button from "src/components/Button";
import { COLORS } from "src/constants/colors";
import DeleteIcon from "@assets/icons/inventory-list/delete-icon.svg";
import { useForm, useFormContext } from "react-hook-form";
import { parseMetadata } from "../utils";
import FormTextFieldOutline from "src/components/TextField/FormTextFieldOutline";

export type PeripheralAttributes = {
  attribute: string;
  value: string;
};

const MetadataForm = () => {
  // Form Hooks
  const { setValue: setFormValue } = useFormContext();
  const { control, handleSubmit, resetField } = useForm<{
    attribute: string;
    value: string;
  }>({
    mode: "onChange",
  });

  // React Hooks
  const [attributes, setAttributes] = useState<PeripheralAttributes[]>([]);
  useEffect(() => {
    const parsedMetadata = parseMetadata(attributes);
    setFormValue("metadata", parsedMetadata);
  }, [attributes]);

  // Functions
  const addAttribute = (data: { attribute: string; value: string }) => {
    const { attribute, value } = data;
    setAttributes((prev) => [...prev, { attribute, value }]);
    resetField("attribute");
    resetField("value");
  };

  const removeAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={{ gap: 12 }}>
      <Text variant="body2bold">Peripheral Attributes:</Text>
      <Text variant="body3regular" style={{ marginTop: -12 }}>
        {`You can specify all the peripheral's details here. \n ie: Brand: Acer, Refresh Rate: 150hz etc.`}
      </Text>
      {attributes.length > 0 && (
        <>
          {attributes.map((attribute, index) => (
            <AttributeComponent
              attribute={attribute}
              key={`attribute-${index}`}
              onPress={() => removeAttribute(index)}
            />
          ))}
        </>
      )}
      <FormTextFieldOutline
        control={control}
        label={"Attribute"}
        name={"attribute"}
        rules={{
          required: "Attribute name is required to create an attribute.",
        }}
      />
      <FormTextFieldOutline
        control={control}
        label={"Value"}
        name={"value"}
        rules={{
          required: "Value name is required to create an attribute.",
        }}
      />
      <Button
        title="Add Attribute"
        onPress={handleSubmit(addAttribute)}
        style={{ backgroundColor: COLORS.green }}
      />
    </View>
  );
};

const AttributeComponent = (props: {
  attribute: PeripheralAttributes;
  onPress: () => void;
}) => {
  const { onPress } = props;
  const { attribute, value } = props.attribute;
  return (
    <View>
      <View style={styles.attributeContainer}>
        <View style={styles.attributeDetails}>
          <Text variant="body2bold">{attribute}:</Text>
          <Text variant="body2regular">{value}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MetadataForm;

const styles = StyleSheet.create({
  attributeContainer: {
    backgroundColor: COLORS.transparent,
    padding: 12,
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  attributeDetails: { display: "flex", flexDirection: "row", gap: 15 },
});
