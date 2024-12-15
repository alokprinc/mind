import {
  fetchAffirmations,
  addFavorite,
  removeFavorite,
} from "@/store/actions/affirmationsAction";
import { AppDispatch, RootState } from "@/store/store";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect,useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const { width } = Dimensions.get("window");

const RenderItem = ({ item, toggleFavorite, shareAffirmation }: any) => (
  <View style={styles.card}>
    <View style={styles.affirmationText}>
      <Text style={{ fontSize: 22 }}>{item.affirmation}</Text>
    </View>
    <View style={styles.iconsContainer}>
      <TouchableOpacity onPress={() => shareAffirmation(item.affirmation)}>
        <Icon name="share-outline" size={30} color="#3498db" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toggleFavorite(item.aid, item.isFavorite)}
      >
        <Icon
          name={item.isFavorite ? "heart" : "heart-outline"} // Properly toggle heart icon
          size={30}
          color={item.isFavorite ? "#e74c3c" : "#3498db"} // Toggle color as well
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default function Home() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.affirmations);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchAffirmations({ offset: data.offset, limit: data.limit }));
  }, [dispatch]);

  const toggleFavorite = (id: number, isFavorite: boolean) => {
    if (!user) return;

    if (isFavorite) {
      dispatch(removeFavorite({ affirmationId: id, userId: user.uid }));
    } else {
      dispatch(
        addFavorite({
          affirmationId: id,
          userId: user.uid,
          userName: user.username,
        })
      );
    }

    const updatedFavoritesMap = {
      ...data.favoritesMap,
      [id]: isFavorite, // Toggle the favorite status in the map
    };
  };
  const shareAffirmation = async (affirmation: string) => {
    try {
      await Share.share({ message: affirmation });
    } catch (error: any) {
      alert(error.message);
    }
  };
  const renderItem = ({ item }: any) => {
    const isFavorite = data.favoritesMap[item.aid]; // Check the favoritesMap for the item
    return (
      <RenderItem
        item={{ ...item, isFavorite }} // Pass the updated isFavorite prop
        toggleFavorite={toggleFavorite}
        shareAffirmation={shareAffirmation}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.affirmations}
        renderItem={renderItem}
        keyExtractor={(item) => item.aid.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        onEndReached={() => {
          if (data.status !== "loading") {
            dispatch(
              fetchAffirmations({ offset: data.offset, limit: data.limit })
            );
          }
        }}
        onEndReachedThreshold={0.5}
      />
      <StatusBar style="inverted" backgroundColor="#76a5a7" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#76a5a7",
  },
  card: {
    width: width - 40, // Width of each card
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20, // Margin for centering the card
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  affirmationText: {
    fontSize: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    color: "#fff6f6",
    width: "100%",
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  iconButton: {
    marginLeft: 15,
  },
});
