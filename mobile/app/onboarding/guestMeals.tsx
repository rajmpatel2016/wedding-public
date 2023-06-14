import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";

// Components
import { Link } from "expo-router";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";

// Assets
import { AntDesign } from "@expo/vector-icons";

// Containers
import { ApiContainer } from "../../container/container";

export const GuestMeals = () => {
  const [meals, setMeals] = useState([
    {
      name: "",
    },
    {
      name: "",
    },
    {
      name: "",
    },
  ]);

  const mealResponsesContainer = ApiContainer.useContainer();

  const onChangeMeal = (value, index) => {
    const newMeals = [...meals];
    const changedMeal = newMeals[index];
    changedMeal.name = value;
    setMeals([...newMeals]);
  };

  const removeMeal = (index) => {
    const mealRemoved = [...meals];
    mealRemoved.splice(index, 1);
    setMeals(mealRemoved);
  };

  return (
    <Container link="onboarding/mealResponses">
      <Text style={styles.title}>Add meal options</Text>

      <View style={styles.container}>
        <ScrollView>
          <View style={{ gap: 18 }}>
            <Text style={styles.subtitle}>
              Enter the meal options for your guests (e.g., chicken, fish).
            </Text>

            {meals.map((meal, index) => (
              <CustomTextInput
                onChange={(value) => onChangeMeal(value, index)}
                value={meal.name}
                placeholder={`Meal option ${index + 1}`}
                rightIcon={
                  <View>
                    <TouchableOpacity onPress={() => removeMeal(index)}>
                      <AntDesign name="closecircleo" size={15} color="black" />
                    </TouchableOpacity>
                  </View>
                }
              />
            ))}
            <Pressable onPress={() => setMeals([...meals, { name: "" }])}>
              <View style={{ alignItems: "center" }}>
                <AntDesign name="pluscircleo" size={20} color="black" />
              </View>
            </Pressable>
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <CustomButton
            onPress={() =>
              mealResponsesContainer.createMealResponsesBatch(meals)
            }
            title="Next"
          />
          <Link href="onboarding/specialGroup" asChild>
            <Pressable style={styles.link}>
              <Text style={{ textAlign: "center" }}>Not now</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 38,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 10,
  },
  addRemove: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    marginTop: 16,
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "column",
    paddingBottom: 35,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
  },
  buttons: {
    paddingTop: 20,
  },
});

export default GuestMeals;
