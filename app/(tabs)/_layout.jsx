import { Tabs } from "expo-router";
import { Image, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const TabsLayout = () => {
  const TabBarIcon = ({ color, name, focused }) => {
    return (
      <View>
        <Icon name={name} size={20} color={color} />
        {/* <Text className={`${focused} ? "" : "" ` }> {name} </Text> */}
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 0,
          borderTopColor: "#23533",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name="bookmark" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name="plus" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} name="user" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
