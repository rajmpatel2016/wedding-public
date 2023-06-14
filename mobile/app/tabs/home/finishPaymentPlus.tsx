import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

// Assets
import { AntDesign } from "@expo/vector-icons";

// Components
import Container from "../../../components/Container";
import CustomButton from "../../../components/CustomButton";
import CustomTextInput from "../../../components/CustomTextInput";

export const FinishPaymentplus = () => {
  return (
    <Container link="/tabs/home/payment">
      <View style={{ marginTop: 32, gap: 30 }}>
        <Text style={styles.title}>Payment</Text>
        <CustomTextInput placeholder="Card holder name" maxLength={40} />
        <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <CustomTextInput
            placeholder="Card number"
            keyboardType="numeric"
            maxLength={19}
          />
          <CustomTextInput
            placeholder="Valid until"
            keyboardType="numeric"
            customStyles={{ width: "60%" }}
            maxLength={5}
          />
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <CustomTextInput
            placeholder="ZIP code"
            keyboardType="numeric"
            maxLength={5}
          />
          <CustomTextInput
            placeholder="CVV"
            customStyles={{ width: "60%" }}
            keyboardType="numeric"
            maxLength={3}
            password={true}
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 40,
          gap: 20,
        }}
      >
        <Text
          style={{
            color: "#667080",
            fontSize: 16,
            fontWeight: "400",
          }}
        >
          Texting package for up to 250+ guests:{" "}
          <Text style={{ color: "black", fontWeight: "600" }}>$150</Text>
        </Text>
        <CustomButton title="Pay now" />
        <Pressable style={styles.blackButton} onPress={FinishPaymentplus}>
          <Text
            style={{
              fontWeight: "600",
              color: "white",
              fontSize: "20",
            }}
          >
            Pay with <AntDesign name="apple1" size={18} color="white" />
            <Text style={{ fontWeight: "600", color: "white" }}>Pay</Text>
          </Text>
        </Pressable>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 36,
    marginTop: 16,
  },
  blackButton: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 13,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
});

export default FinishPaymentplus;
