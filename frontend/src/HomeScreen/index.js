import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DrawerView from '../components/DrawerView';
import LocationComp from '../components/LocationComp';
import OptionItem from './OptionItem';
import CommonStyles from '../CommonStyles';
import CollectionItem from './CollectionItem';
import PopularItemList from './PopularItemList';
import RestuarantComp from '../components/RestuarantComp';
import LoginComp from '../LoginComp';
const HomeScreen = ({navigation}) => {
  const [showLocationList, setShowLocationList] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Bengaluru');
  const [showRestaurantList, setShowRestaurantList] = useState(false);
  const [showLoginComp, setShowLoginComp] = useState(false);

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <DrawerView show={showLocationList}>
        <LocationComp setShow={setShowLocationList} />
      </DrawerView>
      <DrawerView show={showRestaurantList}>
        <RestuarantComp
          selectedLocation={selectedLocation}
          setShow={setShowRestaurantList}
          setShowLocationList={setShowLocationList}
        />
      </DrawerView>

      <DrawerView show={showLoginComp}>
        <LoginComp setShow={setShowLoginComp} />
      </DrawerView>

      <View>
        <ImageBackground
          source={require('../img/home-screen.png')}
          style={styles.imagebg}>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              paddingRight: 20,
              paddingBottom: 10,
            }}>
            <Pressable
              style={{padding: 10}}
              onPress={() => setShowLoginComp(true)}>
              <FontAwesome name="user-circle-o" size={30} color="#FF6666" />
            </Pressable>
          </View>
          <Image source={require('../img/zomato.png')} style={styles.logo} />
          <Text style={styles.subHeading}>
            Discover the best food and drinks in
          </Text>
          <Text style={[styles.subHeading, styles.location]}>Bengaluru</Text>
          <Pressable
            style={{width: '100%'}}
            onPress={() => setShowLocationList(true)}>
            <View style={styles.textInputContainer}>
              <MaterialIcons
                name="location-on"
                style={{padding: 10}}
                size={30}
                color="#f46666"
              />
              <Text style={styles.textInput}>{selectedLocation}</Text>
              <AntDesign
                name="caretdown"
                style={{padding: 10}}
                size={20}
                color="#ccc"
              />
            </View>
          </Pressable>
          <Pressable
            style={{width: '100%'}}
            onPress={() => setShowRestaurantList(true)}>
            <View style={styles.textInputContainer}>
              <MaterialIcons
                name="search"
                style={{padding: 10}}
                size={25}
                color="#ccc"
              />
              <TextInput
                style={styles.textInput}
                editable={false}
                placeholder="Search for restaurant, cuisine or a dish.."
              />
            </View>
          </Pressable>
        </ImageBackground>
        <View>
          <View style={CommonStyles.horizontalView}>
            <OptionItem
              image={require('../img/food1.png')}
              title="Order Food online"
            />
            <OptionItem
              image={require('../img/food2.png')}
              title="Go out for a meal"
            />
          </View>
          <View style={CommonStyles.horizontalView}>
            <OptionItem
              image={require('../img/food3.png')}
              title="Nightlife & Clubs"
            />
            <OptionItem
              image={require('../img/food4.png')}
              title="Zomato Pro"
            />
          </View>
        </View>
        <View style={{marginTop: 100, padding: 10}}>
          <Text style={{fontSize: 24}}>Collections</Text>
          <Text style={{paddingVertical: 10}}>
            Explore curated lists of top restaurants, cafes, pubs, and bars in
            Bengaluru, based on trends
          </Text>
          <View>
            <View style={[CommonStyles.horizontalView, {marginVertical: 10}]}>
              <CollectionItem
                image={require('../img/collection1.jpg')}
                title="Trending this week"
                subTitle="30 Places ▶"
              />
              <CollectionItem
                image={require('../img/collection2.jpg')}
                title="Chennai's Finest"
                subTitle="102 Places ▶"
              />
            </View>
            <View style={[CommonStyles.horizontalView, {marginVertical: 10}]}>
              <CollectionItem
                image={require('../img/collection1.jpg')}
                title="Trending this week"
                subTitle="30 Places ▶"
              />
              <CollectionItem
                image={require('../img/collection2.jpg')}
                title="Chennai's Finest"
                subTitle="102 Places ▶"
              />
            </View>
          </View>
          <Pressable onPress={() => navigation.navigate('DEV')}>
            <View>
              <Text style={styles.clearRed}>All collections in Chennai ▶</Text>
            </View>
          </Pressable>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{fontSize: 24}}>Popular localities in and around </Text>
          <Text style={{fontWeight: 'bold', fontSize: 24}}>
            {selectedLocation}
          </Text>
        </View>
        <PopularItemList />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  imagebg: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
    paddingBottom: 10,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  subHeading: {
    fontWeight: '300',
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30,
  },
  location: {
    paddingVertical: 10,
  },
  textInputContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  textInput: {
    flex: 2,
    paddingLeft: 20,
  },
  clearRed: {
    color: 'red',
    paddingLeft: 10,
    fontSize: 18,
  },
});
