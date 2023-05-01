import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Car } from "../../components/car/Car";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, TouchableOpacity, Alert } from "react-native";
import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import { CarDTO } from "../../dtos/CarDTO";
import { Car as ModelCar } from "../../database/model/Car";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";
import Logo from "../../assets/logo.svg";
import LoadAnimation from "../../components/Loading/LoadAnimation";
// import { Ionicons } from "@expo/vector-icons";
// import { useTheme } from "styled-components";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   useAnimatedGestureHandler,
//   withSpring,
// } from "react-native-reanimated";
// import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  // const theme = useTheme();
  const [cars, setCars] = useState<Array<ModelCar[]>>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // const positionY = useSharedValue(0);
  // const positionX = useSharedValue(0);
  // const myCarButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateY: positionY.value },
  //       { translateX: positionX.value },
  //     ],
  //   };
  // });

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart(_, ctx: any) {
  //     ctx.positionX = positionX.value;
  //     ctx.positionY = positionY.value;
  //   },
  //   onActive(event, ctx: any) {
  //     positionY.value = event.translationY + ctx.positionY;
  //     positionX.value = event.translationX + ctx.positionX;
  //   },
  //   onEnd(_, ctx: any) {
  //     positionY.value = withSpring(0);
  //     positionX.value = withSpring(0);
  //   },
  // });

  async function offlineSyncronize() {
    // sincronizacao ofline
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = response?.data;
        console.log("Backend Changes");
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.user;
        console.log("user", user);
        if (user) await api.post("/users/sync", { user: user });
      },
    });
  }

  function handleGotoCarDetail(car: ModelCar) {
    navigation.navigate("CarDetails" as never, { car } as never);
  }
  // function handleGotoMyCars() {
  //   navigation.navigate("MyCars" as never);
  // }

  async function fetchCars() {
    try {
      setLoading(true);
      const CarCollection = database.get<ModelCar>("cars");
      const cars = await CarCollection.query().fetch();
      console.log("Carros", cars);
      setCars(cars);
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    let isTrue = true;
    if (isTrue) fetchCars();
    return () => {
      isTrue = false;
    };
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <TouchableOpacity onPress={() => offlineSyncronize()}>
            <Logo height={RFValue(12)} width={RFValue(108)} />
          </TouchableOpacity>
          {!loading && <TotalCars>Total de {cars?.length} Carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item: CarDTO) => String(item.id)}
          renderItem={({ item }: any) => (
            <Car data={item} onPress={() => handleGotoCarDetail(item)} />
          )}
        />
      )}
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleGotoMyCars}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.main,
              },
            ]}
          >
            <Ionicons
              color={theme.colors.shape}
              name="ios-car-sport"
              size={32}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
