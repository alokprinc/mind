import React, { useState } from "react";
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

const { width } = Dimensions.get("window");

const affirmations = [
  { id: 1, affirmation: "I am confident and capable." },
  { id: 2, affirmation: "I embrace challenges and grow from them." },
  { id: 3, affirmation: "I am worthy of love and respect." },
  
  {
    id: 100,
    affirmation: "I am deserving of all the happiness life has to offer.",
  },
];

export default function Home() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const shareAffirmation = async (affirmation: string) => {
    try {
      await Share.share({ message: affirmation });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card} className='bg-custom'>
      <View style={styles.affirmationText}>
        <Text style={{ fontSize: 22 }}>{item.affirmation}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => shareAffirmation(item.affirmation)}>
          <Icon name="share-outline" size={30} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          style={styles.iconButton}
        >
          <Icon
            name={favorites.includes(item.id) ? "heart" : "heart-outline"}
            size={30}
            color={favorites.includes(item.id) ? "#e74c3c" : "#3498db"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={affirmations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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
