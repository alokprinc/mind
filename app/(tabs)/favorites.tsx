// Favorites.tsx
import React from "react";
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
import { AppDispatch, RootState } from "@/store/store"; // Adjust this path if necessary
import {
  addFavorite,
  removeFavorite,
} from "@/store/actions/affirmationsAction";

const { width } = Dimensions.get("window");

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.affirmations);
  const user = useSelector((state: RootState) => state.auth.user);

  // Filter affirmations to only show favorites
  const favoriteAffirmations = data.affirmations.filter(
    (affirmation) => data.favoritesMap[affirmation.aid]
  );

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

    // Optimistically update UI before the API response
    const updatedAffirmations = favoriteAffirmations.map((affirmation) => {
      if (affirmation.aid === id) {
        return { ...affirmation, isFavorite: !isFavorite };
      }
      return affirmation;
    });
  };

  const shareAffirmation = async (affirmation: string) => {
    try {
      await Share.share({ message: affirmation });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const renderItem = ({ item }: any) => (
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

  return (
    <View style={styles.container}>
      {favoriteAffirmations.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorites found</Text>
      ) : (
        <FlatList
          data={favoriteAffirmations}
          renderItem={renderItem}
          keyExtractor={(item) => item.aid.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
        />
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#76a5a7",
    justifyContent: "center",
    alignItems: "center",
  },
  noFavoritesText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  card: {
    width: width - 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
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
    color: "#000",
    width: "100%",
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
