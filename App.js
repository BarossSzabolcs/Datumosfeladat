import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';

export default function App() {
  const [countryCode, setCountryCode] = useState("us");  // Default country code
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch news based on country code
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=business&apiKey=3896d67f06394c548239d21610ab6841`);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      alert("Error fetching data");
    }
    setLoading(false);
  };

  const ArticleItem = ({ item }) => (
    <View style={styles.articleCard}>
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
      )}
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
      <Text style={styles.articleSource}>{item.source.name}</Text>
      <Text style={styles.articleDate}>{new Date(item.publishedAt).toLocaleString()}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <Text style={styles.articleLink}>Read more</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Country Code:</Text>
      <TextInput
        style={styles.input}
        value={countryCode}
        onChangeText={setCountryCode}
        placeholder="Enter country code"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={fetchNews}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <Text style={styles.loadingText}>Loading...</Text>}

      {articles.length > 0 && (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ArticleItem item={item} />}
          style={styles.flatList}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',  // Light grey background for modern look
    padding: 20,
  },
  label: {
    color: '#1a1a1a',  // Darker grey text for a sleek look
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#ffffff',  // Clean white background for input
    color: '#1a1a1a',  // Dark text color
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',  // Subtle border for refinement
    shadowColor: '#000',
    shadowOpacity: 0.05,  // Softer shadow to mimic depth without harshness
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  button: {
    backgroundColor: '#007aff',  // Apple's signature blue accent
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  articleCard: {
    backgroundColor: '#ffffff',  // White cards for a clean, minimalistic feel
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,  // Rounded corners
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
  articleImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',  // Dark text for modern look
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 15,
    color: '#666666',  // Lighter grey for description
    marginBottom: 10,
  },
  articleSource: {
    fontSize: 12,
    color: '#888888',  // Subtle grey for source name
    marginBottom: 5,
    fontStyle: 'italic',
  },
  articleDate: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 10,
  },
  articleLink: {
    fontSize: 16,
    color: '#007aff',  // Apple-like link color
    textDecorationLine: 'underline',
  },
  loadingText: {
    color: '#1a1a1a',
    fontSize: 18,
    textAlign: 'center',
  },
  flatList: {
    marginTop: 20,
  },
});
